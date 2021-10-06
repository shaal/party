import { gql, useMutation } from '@apollo/client'
import { Button } from '@components/ui/Button'
import { Card, CardBody } from '@components/ui/Card'
import { Spinner } from '@components/ui/Spinner'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import useSWR from 'swr'
import Web3 from 'web3'
import Web3Modal from 'web3modal'

import {
  CreateNftMutation,
  CreateNftMutationVariables
} from './__generated__/NFT.generated'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const NFTType: React.FC = () => {
  const router = useRouter()
  const [ethAddress, setEthAddress] = useState<string>()
  const { data } = useSWR(
    `https://${
      process.env.NODE_ENV === 'production' ? 'testnets-api' : 'testnets-api'
    }.opensea.io/api/v1/assets?format=json&limit=9&offset=0&order_direction=desc&owner=${ethAddress}`,
    fetcher,
    {
      isPaused: () => {
        return !ethAddress
      }
    }
  )
  const [createNFT] = useMutation<
    CreateNftMutation,
    CreateNftMutationVariables
  >(
    gql`
      mutation CreateNFTMutation($input: CreatePostInput!) {
        createPost(input: $input) {
          id
        }
      }
    `,
    {
      onCompleted(data) {
        toast.success('NFT has been posted successfully!')
        router.push(`/posts/${data?.createPost?.id}`)
      }
    }
  )

  const connectWallet = async () => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const web3 = new Web3(connection)

    // @ts-ignore
    setEthAddress(web3?.currentProvider?.selectedAddress)
  }

  if (!ethAddress)
    return (
      <div className="space-y-2">
        <div>
          Put some text here! Put some text here! Put some text here! Put some
          text here! Put some text here! Put some text here! Put some text here!
          Put some text here! Put some text here!
        </div>
        <Button type="button" onClick={connectWallet}>
          Load NFTs
        </Button>
      </div>
    )

  if (!data)
    return (
      <div className="p-5 font-bold text-center space-y-2">
        <Spinner size="md" className="mx-auto" />
        <div>Loading collectibles from OpenSea</div>
      </div>
    )

  return (
    <Card>
      <CardBody className="grid gap-3 md:grid-cols-4 grid-cols-2">
        {data?.assets?.map((asset: any) => (
          <div key={asset?.id}>
            <div
              className="cursor-pointer"
              onClick={() =>
                createNFT({
                  variables: {
                    input: {
                      body: asset?.name,
                      type: 'NFT',
                      address: asset?.asset_contract?.address,
                      tokenId: asset?.token_id
                    }
                  }
                })
              }
            >
              <img
                className="object-cover h-38 w-38 rounded-lg border"
                src={asset?.image_url}
                alt={asset?.name}
              />
            </div>
          </div>
        ))}
      </CardBody>
    </Card>
  )
}

export default NFTType
