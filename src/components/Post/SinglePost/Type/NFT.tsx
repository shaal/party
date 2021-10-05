import { gql, useQuery } from '@apollo/client'
import { useNFT } from '@components/utils/useNFT'
import { ExclamationCircleIcon, UsersIcon } from '@heroicons/react/outline'
import React from 'react'
import { Post } from 'src/__generated__/schema.generated'

import { PostNftQuery } from './__generated__/NFT.generated'

export const POST_NFT_QUERY = gql`
  query PostNFTQuery($id: ID!) {
    post(id: $id) {
      id
      nft {
        id
        address
        tokenId
      }
    }
  }
`

interface Props {
  post: Post
}

const NFTType: React.FC<Props> = ({ post }) => {
  const { data, loading, error } = useQuery<PostNftQuery>(POST_NFT_QUERY, {
    variables: {
      id: post.id
    },
    skip: !post.id
  })

  const { nft, isLoading, isError } = useNFT(
    data?.post?.nft?.address as string,
    data?.post?.nft?.tokenId as string
  )

  if (loading || isLoading) return <div>Loading NFT...</div>

  if (error || isError)
    return (
      <div className="text-red-500 font-bold flex items-center space-x-1">
        <ExclamationCircleIcon className="h-5 w-5" />
        <div>Error fetching NFT data</div>
      </div>
    )

  return (
    <div className="space-y-2">
      <div className="pt-5 space-y-2">
        <div className="grid gap-5 md:grid-cols-2 grid-cols-1">
          <div>
            <img className="rounded-lg" src={nft?.image_url} alt={nft?.name} />
          </div>
          <div className="space-y-3">
            <div className="linkify flex items-center space-x-1.5">
              <div>Posted in</div>
              <a
                className="font-bold"
                href={`https://opensea.io/collection/${nft?.collection?.slug}`}
                target="_blank"
                rel="noreferrer"
              >
                {nft?.collection?.name}
              </a>
            </div>
            <div className="font-bold text-xl">{nft?.name}</div>
            {nft?.description && (
              <div className="text-gray-500 dark:text-gray-800 line-clamp-6">
                {nft?.description}
              </div>
            )}
            <div className="linkify flex items-center space-x-1.5">
              <div>Created by</div>
              <img
                className="h-5 w-5 rounded-full"
                src={nft?.creator?.profile_img_url}
                alt={nft?.creator?.user?.username}
              />
              <a
                href={`https://opensea.io/${nft?.creator?.user?.username}`}
                target="_blank"
                rel="noreferrer"
              >
                {nft?.creator?.user?.username}
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1.5">
                <UsersIcon className="h-5 w-5" />
                <div>{nft?.top_ownerships.length} owners</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NFTType
