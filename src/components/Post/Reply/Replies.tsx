import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { useState } from 'react'
import useInView from 'react-cool-inview'

import { Post, Reply } from '~/__generated__/schema.generated'
import PostShimmer from '~/components/shared/Shimmer/PostShimmer'
import { ErrorMessage } from '~/components/ui/ErrorMessage'

import { RepliesQuery } from './__generated__/Replies.generated'
import SingleReply from './SingleReply'

const query = gql`
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
          user {
            id
            username
            profile {
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
  const [hasNextPage, setHasNextPage] = useState<boolean>(true)
  const { data, loading, error, fetchMore } = useQuery<RepliesQuery>(query, {
    variables: {
      after: null,
      where: {
        postId: post?.id
      }
    }
  })

  const { observe } = useInView({
    threshold: 1,
    onChange: ({ observe, unobserve }) => {
      unobserve()
      observe()
    },
    onEnter: () => {
      const endCursor = data?.replies?.pageInfo?.endCursor

      fetchMore({
        variables: {
          after: endCursor
        },
        // @ts-ignore
        updateQuery: (
          previousResult,
          { fetchMoreResult }: { fetchMoreResult: any }
        ) => {
          const previousEdges = previousResult?.replies?.edges
          const newEdges = fetchMoreResult?.replies?.edges
          const pageInfo = fetchMoreResult?.replies?.pageInfo
          setHasNextPage(pageInfo?.hasNextPage)
          if (!fetchMoreResult) return previousResult
          return {
            replies: { edges: [...previousEdges, ...newEdges], pageInfo }
          }
        }
      })
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
        {data?.replies?.edges?.length === 0 ? (
          <div>Nothing here</div>
        ) : (
          data?.replies?.edges?.map((reply: any) => (
            <SingleReply key={reply?.node?.id} reply={reply?.node as Reply} />
          ))
        )}
        {hasNextPage && <div ref={observe}></div>}
      </div>
    </div>
  )
}

export default Replies
