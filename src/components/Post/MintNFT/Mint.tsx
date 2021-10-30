import { gql, useMutation } from '@apollo/client'
import { Button } from '@components/UI/Button'
import { Form, useZodForm } from '@components/UI/Form'
import { Input } from '@components/UI/Input'
import { Spinner } from '@components/UI/Spinner'
import getNFTData from '@components/utils/getNFTData'
import getWeb3Modal from '@components/utils/getWeb3Modal'
import { ArrowRightIcon } from '@heroicons/react/outline'
import { ethers } from 'ethers'
import { create, urlSource } from 'ipfs-http-client'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Post } from 'src/__generated__/schema.generated'
import { IS_PRODUCTION, NFT_MARKET_ADDRESS } from 'src/constants'
import { object, string } from 'zod'

import Market from '../../../../artifacts/contracts/Market.sol/NFTMarket.json'
import {
  MintNftMutation,
  MintNftMutationVariables
} from './__generated__/Mint.generated'

const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https'
})

const newNFTSchema = object({
  title: string().min(0).max(100)
})

interface Props {
  post: Post
}

const Mint: React.FC<Props> = ({ post }) => {
  const [isMinting, setIsMinting] = useState<boolean>(false)
  const [mintingStatus, setMintingStatus] = useState<
    'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'ERRORED'
  >('NOT_STARTED')
  const [mintingStatusText, setMintingStatusText] = useState<string>('')
  const [mintedAddress, setMintedAddress] = useState<string>('')
  const [mintedTokenId, setMintedTokenId] = useState<string>('')
  const [mintNFT] = useMutation<MintNftMutation, MintNftMutationVariables>(
    gql`
      mutation MintNFTMutation($input: MintNFTInput!) {
        mint(input: $input) {
          id
          address
          tokenId
        }
      }
    `,
    {
      onCompleted(data) {
        setMintedAddress(data?.mint?.address)
        setMintedTokenId(data?.mint?.tokenId)
      }
    }
  )

  const form = useZodForm({
    schema: newNFTSchema,
    defaultValues: {
      title: `Post by @${post?.user?.username} in Devparty`
    }
  })

  const createSale = async (url: string) => {
    try {
      // Get signature from the user
      const web3Modal = getWeb3Modal()
      const web3 = new ethers.providers.Web3Provider(await web3Modal.connect())
      const signer = await web3.getSigner()

      // Mint the Item
      const contract = new ethers.Contract(
        NFT_MARKET_ADDRESS as string,
        Market.abi,
        signer
      )
      setMintingStatusText('Item listing in progress')
      const transaction = await contract.mint(await signer.getAddress(), url)
      console.log(transaction)
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

  const createMarket = async () => {
    setMintingStatus('IN_PROGRESS')
    setIsMinting(true)
    try {
      setMintingStatusText(
        `We're preparing your NFT, We'll ask you to confirm with your wallet shortly`
      )
      const { cid } = await client.add(
        urlSource(`https://nft.devparty.io/${post?.body}`)
      )
      const { path } = await client.add(
        JSON.stringify({
          name: form.watch('title'),
          ...getNFTData(post, `https://ipfs.io/ipfs/${cid}`)
        })
      )
      const url = `https://ipfs.io/ipfs/${path}`
      createSale(url)
    } catch {
      setIsMinting(false)
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
            <a
              href={`https://${
                IS_PRODUCTION ? 'opensea.io' : 'testnets.opensea.io'
              }/assets/${
                IS_PRODUCTION ? 'matic' : 'mumbai'
              }/${mintedAddress}/${mintedTokenId}`}
              target="_blank"
              rel="noreferrer"
            >
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
        <Form form={form} className="space-y-3" onSubmit={createMarket}>
          <div>
            <Input
              label="Title"
              placeholder="Title of your NFT"
              {...form.register('title')}
            />
          </div>
          <div>
            <Button>Mint NFT</Button>
          </div>
        </Form>
      )}
    </div>
  )
}

export default Mint
