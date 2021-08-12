import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { useState } from 'react'
import useInView from 'react-cool-inview'

import { User } from '../../__generated__/schema.generated'
import SinglePost, { PostFragment } from '../Posts/SinglePost'
import PostShimmer from '../shared/Shimmer/PostShimmer'
import { ErrorMessage } from '../ui/ErrorMessage'
import { UserFeedQuery } from './__generated__/Feed.generated'

const USER_FEED_QUERY = gql`
  query UserFeedQuery($after: String, $where: WherePostsInput) {
    posts(first: 10, after: $after, where: $where) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          ...PostFragment
        }
      }
    }
  }
  ${PostFragment}
`

interface Props {
  feedType?: string
  user: User
}

const UserFeed: React.FC<Props> = ({ feedType, user }) => {
  const [hasNextPage, setHasNextPage] = useState<boolean>(true)
  const { data, loading, error, fetchMore } = useQuery<UserFeedQuery>(
    USER_FEED_QUERY,
    {
      variables: {
        after: null,
        where: {
          userId: user?.id,
          type: feedType === 'ALL' ? 'ALL' : feedType
        }
      }
    }
  )

  const posts = data?.posts?.edges?.map((edge) => edge?.node)
  const pageInfo = data?.posts?.pageInfo

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
        {posts?.length === 0 ? (
          <div>Nothing here</div>
        ) : (
          posts?.map((post: any) => (
            <SinglePost key={post?.id} post={post} showReplies />
          ))
        )}
        {hasNextPage && <div ref={observe}></div>}
      </div>
    </div>
  )
}

export default UserFeed
