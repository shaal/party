import { gql, useMutation, useQuery } from '@apollo/client'
import { Button } from '@components/ui/Button'
import { Card, CardBody } from '@components/ui/Card'
import { Spinner } from '@components/ui/Spinner'
import { Tooltip } from '@components/ui/Tooltip'
import { CashIcon, CollectionIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import toast from 'react-hot-toast'
import { ERROR_MESSAGE, IS_PRODUCTION } from 'src/constants'
import useSWR from 'swr'

import {
  CreateNftMutation,
  CreateNftMutationVariables,
  GetEthAddressQuery
} from './__generated__/NFT.generated'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export const GET_ETHADDRESS_QUERY = gql`
  query GetEthAddressQuery {
    me {
      id
      ethAddress
    }
  }
`

const NFTType: React.FC = () => {
  const router = useRouter()
  const { data: user, loading } =
    useQuery<GetEthAddressQuery>(GET_ETHADDRESS_QUERY)

  const { data } = useSWR(
    `https://${
      IS_PRODUCTION ? 'testnets-api' : 'testnets-api'
    }.opensea.io/api/v1/assets?format=json&limit=20&offset=0&order_direction=desc&owner=${
      user?.me?.ethAddress
    }`,
    fetcher,
    {
      isPaused: () => {
        return !user?.me?.ethAddress
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
        router.push(`/posts/${data?.createPost?.id}`)
      }
    }
  )

  if (!user?.me?.ethAddress && !loading)
    return (
      <div className="p-5 font-bold text-center">
        <div className="mb-4">
          Connect your wallet that is associated with your NFTs in your
          integration settings.
        </div>
        <Link href="/settings/integration">
          <a>
            <Button
              className="mx-auto"
              type="button"
              icon={<CashIcon className="h-5 w-5" />}
            >
              Connect Wallet
            </Button>
          </a>
        </Link>
      </div>
    )

  if (!data)
    return (
      <div className="p-5 font-bold text-center space-y-2">
        <Spinner size="md" className="mx-auto" />
        <div>Loading collectibles from OpenSea</div>
      </div>
    )

  if (data?.assets?.length === 0)
    return (
      <div className="p-5 font-bold text-center space-y-2">
        <CollectionIcon className="h-8 w-8 mx-auto" />
        <div>No collectibles found in OpenSea</div>
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
                toast.promise(
                  createNFT({
                    variables: {
                      input: {
                        body: asset?.name,
                        type: 'NFT',
                        address: asset?.asset_contract?.address,
                        tokenId: asset?.token_id
                      }
                    }
                  }),
                  {
                    loading: 'Posting your NFT',
                    success: () => `NFT has been posted successfully!`,
                    error: () => ERROR_MESSAGE
                  }
                )
              }
            >
              <Card className="p-2 space-y-2">
                <div>
                  <img
                    className="object-cover h-38 w-38 rounded-lg border"
                    src={asset?.image_url}
                    alt={asset?.name}
                  />
                </div>
                <div className="py-1">
                  <div className="text-xs truncate">
                    {asset?.collection?.name}
                  </div>
                  <Tooltip content={asset?.name}>
                    <div className="text-sm truncate font-bold">
                      {asset?.name}
                    </div>
                  </Tooltip>
                </div>
              </Card>
            </div>
          </div>
        ))}
      </CardBody>
    </Card>
  )
}

export default NFTType
