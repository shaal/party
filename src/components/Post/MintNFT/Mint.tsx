import { gql, useMutation } from '@apollo/client'
import { Button } from '@components/UI/Button'
import { Checkbox } from '@components/UI/Checkbox'
import { Form, useZodForm } from '@components/UI/Form'
import { Input } from '@components/UI/Input'
import { Spinner } from '@components/UI/Spinner'
import getNFTData from '@components/utils/getNFTData'
import getWeb3Modal from '@components/utils/getWeb3Modal'
import { Switch } from '@headlessui/react'
import { ArrowRightIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { ethers } from 'ethers'
import { create, urlSource } from 'ipfs-http-client'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Post } from 'src/__generated__/schema.generated'
import { IS_PRODUCTION, NFT_CONTRACT_ADDRESS } from 'src/constants'
import { boolean, object, string } from 'zod'

import Market from '../../../../artifacts/contracts/NFT.sol/Devparty.json'
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
  title: string().min(0).max(255),
  quantity: string().refine((val: string) => !Number.isNaN(parseInt(val, 10)), {
    message: 'Expected number'
  }),
  accept: boolean()
})

interface Props {
  post: Post
}

const Mint: React.FC<Props> = ({ post }) => {
  const [nsfw, setNsfw] = useState<boolean>(false)
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
      title: `Post by @${post?.user?.username} in Devparty`,
      quantity: '1'
    }
  })

  const mintToken = async (url: string) => {
    try {
      // Get signature from the user
      const web3Modal = getWeb3Modal()
      const web3 = new ethers.providers.Web3Provider(await web3Modal.connect())
      const signer = await web3.getSigner()
      const { name: currentNetworkName } = await web3.getNetwork()
      const expectedNetworkName = IS_PRODUCTION ? 'matic' : 'maticmum'

      if (currentNetworkName !== expectedNetworkName) {
        setIsMinting(false)
        return toast.error('You are in wrong network!')
      }

      // Mint the Item
      const contract = new ethers.Contract(
        NFT_CONTRACT_ADDRESS as string,
        Market.abi,
        signer
      )
      setMintingStatusText('Minting NFT in progress')
      const transaction = await contract.issueToken(
        await signer.getAddress(),
        form.watch('quantity'),
        url
      )
      const finishedTransaction = await transaction.wait()
      let event = finishedTransaction.events[0]

      // Add transaction to the DB
      mintNFT({
        variables: {
          input: {
            postId: post?.id,
            address: transaction.to,
            tokenId: event.args[3].toString()
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
          ...getNFTData(nsfw, post, `https://ipfs.infura.io/ipfs/${cid}`)
        })
      )
      const url = `https://ipfs.infura.io/ipfs/${path}`
      mintToken(url)
    } catch {
      setIsMinting(false)
    }
  }

  return (
    <div className="space-y-3">
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
        <Form form={form} onSubmit={generateNft}>
          <div className="px-5 py-3.5 space-y-7">
            <div>
              <Input
                label="Title"
                placeholder="Title of your NFT"
                {...form.register('title')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-bold">Number of Editions</div>
                <div className="text-gray-500">1 by default</div>
              </div>
              <div>
                <Input
                  type="number"
                  className="w-20"
                  placeholder="5"
                  {...form.register('quantity')}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-bold">Explicit Content</div>
                <div className="text-gray-500">18+</div>
              </div>
              <div>
                <Switch
                  checked={nsfw}
                  onChange={setNsfw}
                  className={clsx(
                    { 'bg-brand-500': nsfw },
                    { 'bg-gray-300': !nsfw },
                    'relative inline-flex flex-shrink-0 h-[24.5px] w-12 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none'
                  )}
                >
                  <span className="sr-only">Use setting</span>
                  <span
                    aria-hidden="true"
                    className={clsx(
                      { 'translate-x-6': nsfw },
                      { 'translate-x-0': !nsfw },
                      'pointer-events-none inline-block h-[20px] w-[20px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200'
                    )}
                  />
                </Switch>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Checkbox id="acceptRights" {...form.register('accept')} />
              <label htmlFor="acceptRights">
                I have the rights to publish this artwork, and understand it
                will be minted on the <b>Polygon</b> network.
              </label>
            </div>
          </div>
          <div className="flex items-center justify-between p-5 border-t dark:border-gray-800">
            <a
              className="text-sm text-gray-500"
              href="https://ipfs.io"
              target="_blank"
              rel="noreferrer"
            >
              Stored on <b>IPFS</b>
            </a>
            <Button
              disabled={
                !form.watch('accept') ||
                parseInt(form.watch('quantity')) < 1 ||
                parseInt(form.watch('quantity')) > 1000
              }
            >
              Mint NFT
            </Button>
          </div>
        </Form>
      )}
    </div>
  )
}

export default Mint
