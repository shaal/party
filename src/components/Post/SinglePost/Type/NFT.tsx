import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { Post } from 'src/__generated__/schema.generated'

import { PostNftQuery } from './__generated__/NFT.generated'

export const POST_NFT_QUERY = gql`
  query PostNFTQuery($id: ID!) {
    post(id: $id) {
      id
      poll {
        id
      }
    }
  }
`

interface Props {
  post: Post
}

const NFTType: React.FC<Props> = ({ post }) => {
  const { data, loading } = useQuery<PostNftQuery>(POST_NFT_QUERY, {
    variables: {
      id: post.id
    },
    skip: !post.id
  })
  // const { commit, slug, isLoading, isError } = useNFT(post?.body)

  // if (isLoading) return <div>Loading Commit...</div>

  // if (isError)
  //   return (
  //     <div className="text-red-500 font-bold flex items-center space-x-1">
  //       <ExclamationCircleIcon className="h-5 w-5" />
  //       <div>Error fetching commit data</div>
  //     </div>
  //   )

  return (
    <div className="space-y-2">
      <div className="linkify">{data?.post?.poll?.id}</div>
    </div>
  )
}

export default NFTType
