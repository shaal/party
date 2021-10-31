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

  const mintNft = async (url: string) => {
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
      setMintingStatusText('Minting NFT in progress')
      const transaction = await contract.mint(await signer.getAddress(), url)
      const finishedTransaction = await transaction.wait()
      let event = finishedTransaction.events[0]
      mintNFT({
        variables: {
          input: {
            postId: post?.id,
            address: transaction.to,
            tokenId: event.args[2].toString()
          }
        }
      })

      toast.success('Minting has been successfully completed!')
      setMintingStatus('COMPLETED')
    } catch (error) {
      console.log(error)
      setIsMinting(false)
      setMintingStatus('ERRORED')
      toast.error('Transaction has been cancelled!')
    }
  }

  const generateNft = async () => {
    setMintingStatus('IN_PROGRESS')
    setIsMinting(true)
    try {
      setMintingStatusText('Converting your post as art')
      const { cid } = await client.add(
        urlSource(
          `https://nft.devparty.io/${post?.body}?avatar=${post?.user?.profile?.avatar}`
        )
      )
      setMintingStatusText('Uploading metadata to decentralized servers')
      const { path } = await client.add(
        JSON.stringify({
          name: form.watch('title'),
          ...getNFTData(post, `https://ipfs.infura.io/ipfs/${cid}`)
        })
      )
      const url = `https://ipfs.infura.io/ipfs/${path}`
      mintNft(url)
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
        <Form form={form} className="space-y-3" onSubmit={generateNft}>
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
