import { gql, useQuery } from '@apollo/client'
import { useNFT } from '@components/utils/useNFT'
import { ExclamationCircleIcon } from '@heroicons/react/outline'
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
        <div>Error fetching commit data</div>
      </div>
    )

  return (
    <div className="space-y-2">
      <div className="linkify">{nft?.id}</div>
    </div>
  )
}

export default NFTType
