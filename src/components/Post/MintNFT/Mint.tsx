import { Button } from '@components/UI/Button'
import { Input } from '@components/UI/Input'
import { Spinner } from '@components/UI/Spinner'
import getWeb3Modal from '@components/utils/getWeb3Modal'
import { ethers } from 'ethers'
import { create } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Post } from 'src/__generated__/schema.generated'
import { BASE_URL } from 'src/constants'

import Market from '../../../../artifacts/contracts/Market.sol/NFTMarket.json'
import NFT from '../../../../artifacts/contracts/NFT.sol/NFT.json'
import { nftaddress, nftmarketaddress } from '../../../../config'

const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https'
})

interface Props {
  post: Post
}

const Mint: React.FC<Props> = ({ post }) => {
  const router = useRouter()
  const [ethPrice, setEthPrice] = useState<number>(0)
  const [isMinting, setIsMinting] = useState<boolean>(false)
  const [mintingStatus, setMintingStatus] = useState<string>('')

  async function createMarket() {
    setIsMinting(true)
    try {
      setMintingStatus('Pushing metadata to IPFS')
      const added = await client.add(
        JSON.stringify({
          name: `Post from @${post?.user?.username} in Devparty`,
          description: `${post?.body}\n\nLink to post: ${BASE_URL}/posts/${post?.id}`,
          image:
            post?.attachments.length > 0
              ? post?.attachments[0].url
              : 'https://cloudflare-ipfs.com/ipfs/QmdmPHWQBzV24GvbwCszm2AnWetBENeBP2UStuETsyAp1C',
          attributes: [
            {
              trait_type: 'User',
              value: `@${post?.user?.username}`
            },
            {
              display_type: 'date',
              trait_type: 'Posted at',
              value: new Date(post?.createdAt).getTime() / 1000
            }
          ]
        })
      )
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      createSale(url)
    } catch {
      setIsMinting(false)
    }
  }

  async function createSale(url: string) {
    try {
      // Get signature from the user
      setMintingStatus('Please sign in your wallet')
      const web3Modal = getWeb3Modal()
      const web3 = new ethers.providers.Web3Provider(await web3Modal.connect())
      const signer = await web3.getSigner()

      // Create the item
      setMintingStatus('Item creation in progress')
      let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
      let transaction = await contract.createToken(url)
      let tx = await transaction.wait()
      let event = tx.events[0]
      let value = event.args[2]
      let tokenId = value.toNumber()

      const price = ethers.utils.parseUnits(ethPrice.toString(), 'ether')

      // List the item for sale on the marketplace
      setMintingStatus('Item listing in progress')
      contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
      let listingPrice = await contract.getListingPrice()
      listingPrice = listingPrice.toString()

      transaction = await contract.createMarketItem(
        nftaddress,
        tokenId,
        price,
        { value: listingPrice }
      )
      await transaction.wait()
      console.log(transaction)
      toast.success('Your item has been successfully listed!')
      setMintingStatus('Listing completed! Reloading this page')
      router.reload()
    } catch {
      setIsMinting(false)
      toast.error('Transaction has been cancelled!')
    }
  }

  return (
    <div className="px-5 py-3.5 space-y-3">
      {isMinting ? (
        <div className="p-5 font-bold text-center space-y-2">
          <Spinner size="md" className="mx-auto" />
          <div>{mintingStatus}</div>
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
