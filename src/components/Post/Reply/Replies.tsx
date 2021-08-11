import { gql, useQuery } from '@apollo/client'
import React from 'react'
import useInView from 'react-cool-inview'

import { Post, Reply } from '~/__generated__/schema.generated'
import PostShimmer from '~/components/shared/Shimmer/PostShimmer'
import { ErrorMessage } from '~/components/ui/ErrorMessage'

import { RepliesQuery } from './__generated__/Replies.generated'
import SingleReply from './SingleReply'

export const REPLIES_QUERY = gql`
  query RepliesQuery($after: String, $where: WhereRepliesInput) {
    replies(first: 10, after: $after, where: $where) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          body
          createdAt
          hasLiked
          likesCount
          user {
            id
            username
            profile {
              id
              name
              avatar
            }
          }
        }
      }
    }
  }
`

interface Props {
  post: Post
}

const Replies: React.FC<Props> = ({ post }) => {
  const { data, loading, error, fetchMore } = useQuery<RepliesQuery>(
    REPLIES_QUERY,
    {
      variables: {
        after: null,
        where: {
          postId: post?.id
        }
      }
    }
  )
  const replies = data?.replies?.edges?.map((edge) => edge?.node)
  const pageInfo = data?.replies?.pageInfo

  const { observe } = useInView({
    threshold: 1,
    onChange: ({ observe, unobserve }) => {
      unobserve()
      observe()
    },
    onEnter: () => {
      if (pageInfo?.hasNextPage) {
        fetchMore({
          variables: {
            after: pageInfo?.endCursor
          }
        })
      }
    }
  })

  if (loading)
    return (
      <div className="space-y-3">
        <PostShimmer />
        <PostShimmer />
        <PostShimmer />
      </div>
    )

  return (
    <div>
      <ErrorMessage title="Failed to load posts" error={error} />
      <div className="space-y-3">
        {replies?.length === 0 ? (
          <div>Nothing here</div>
        ) : (
          replies?.map((reply: any) => (
            <SingleReply key={reply?.id} reply={reply as Reply} />
          ))
        )}
        <div ref={observe}></div>
      </div>
    </div>
  )
}

export default Replies
