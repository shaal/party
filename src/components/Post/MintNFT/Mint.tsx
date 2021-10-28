import { gql, useMutation } from '@apollo/client'
import { Button } from '@components/UI/Button'
import { Input } from '@components/UI/Input'
import { Spinner } from '@components/UI/Spinner'
import getNFTData from '@components/utils/getNFTData'
import getWeb3Modal from '@components/utils/getWeb3Modal'
import { ArrowRightIcon } from '@heroicons/react/outline'
import { ethers } from 'ethers'
import { create } from 'ipfs-http-client'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Post } from 'src/__generated__/schema.generated'
import { NFT_ADDRESS, NFT_MARKET_ADDRESS } from 'src/constants'

import Market from '../../../../artifacts/contracts/Market.sol/NFTMarket.json'
import NFT from '../../../../artifacts/contracts/NFT.sol/NFT.json'
import {
  MintNftMutation,
  MintNftMutationVariables
} from './__generated__/Mint.generated'

const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https'
})

interface Props {
  post: Post
}

const Mint: React.FC<Props> = ({ post }) => {
  const [ethPrice, setEthPrice] = useState<number>(0)
  const [isMinting, setIsMinting] = useState<boolean>(false)
  const [mintingStatus, setMintingStatus] = useState<
    'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'ERRORED'
  >('NOT_STARTED')
  const [mintingStatusText, setMintingStatusText] = useState<string>('')
  const [mintNFT] = useMutation<MintNftMutation, MintNftMutationVariables>(
    gql`
      mutation MintNFTMutation($input: MintNFTInput!) {
        mint(input: $input) {
          id
          address
          tokenId
        }
      }
    `
  )

  async function createMarket() {
    setMintingStatus('IN_PROGRESS')
    setIsMinting(true)
    try {
      setMintingStatusText(
        `We're preparing your NFT, We'll ask you to confirm with your wallet shortly`
      )
      const added = await client.add(JSON.stringify(getNFTData(post)))
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      createSale(url)
    } catch {
      setIsMinting(false)
    }
  }

  async function createSale(url: string) {
    try {
      // Get signature from the user
      const web3Modal = getWeb3Modal()
      const web3 = new ethers.providers.Web3Provider(await web3Modal.connect())
      const signer = await web3.getSigner()

      // Create the item
      let contract = new ethers.Contract(NFT_ADDRESS as string, NFT.abi, signer)
      let transaction = await contract.createToken(url)
      setMintingStatusText('Item creation in progress')
      let tx = await transaction.wait()
      let event = tx.events[0]
      let value = event.args[2]
      let tokenId = value.toNumber()

      const price = ethers.utils.parseUnits(ethPrice.toString(), 'ether')

      // List the item for sale on the marketplace
      contract = new ethers.Contract(
        NFT_MARKET_ADDRESS as string,
        Market.abi,
        signer
      )
      let listingPrice = await contract.getListingPrice()
      listingPrice = listingPrice.toString()
      setMintingStatusText('Item listing in progress')
      mintNFT({
        variables: {
          input: { postId: post?.id, address: NFT_ADDRESS as string, tokenId }
        }
      })
      transaction = await contract.createMarketItem(
        NFT_ADDRESS,
        tokenId,
        price,
        { value: listingPrice }
      )
      await transaction.wait()
      toast.success('Your item has been successfully listed!')
      setMintingStatusText('Listing completed! Reloading this page')
      setMintingStatus('COMPLETED')
    } catch (error) {
      console.log(error)
      setIsMinting(false)
      setMintingStatus('ERRORED')
      toast.error('Transaction has been cancelled!')
    }
  }

  return (
    <div className="px-5 py-3.5 space-y-3">
      {mintingStatus === 'COMPLETED' ? (
        <div className="p-5 font-bold text-center space-y-4">
          <div className="space-y-2">
            <div className="text-3xl">🎉</div>
            <div>Your NFT has been successfully minted!</div>
          </div>
          <div>
            <a href="https://opensea.io" target="_blank" rel="noreferrer">
              <Button
                className="mx-auto"
                icon={<ArrowRightIcon className="h-5 w-5" />}
                outline
              >
                View on Opensea
              </Button>
            </a>
          </div>
        </div>
      ) : isMinting ? (
        <div className="p-5 font-bold text-center space-y-2">
          <Spinner size="md" className="mx-auto" />
          <div>{mintingStatusText}</div>
        </div>
      ) : (
        <div className="space-y-3">
          <div>
            <Input
              label="Sale Status and Price"
              type="number"
              placeholder="Asset Price in ETH"
              onChange={(e) => setEthPrice(e.target.value as any)}
            />
          </div>
          <Button onClick={createMarket} disabled={ethPrice <= 0}>
            Mint NFT
          </Button>
        </div>
      )}
    </div>
  )
}

export default Mint
