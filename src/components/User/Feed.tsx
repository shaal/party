import { gql, useQuery } from '@apollo/client'
import { CollectionIcon } from '@heroicons/react/outline'
import React from 'react'
import useInView from 'react-cool-inview'

import { User } from '~/__generated__/schema.generated'
import PostShimmer from '~/components/shared/Shimmer/PostShimmer'
import { EmptyState } from '~/components/ui/EmptyState'
import { ErrorMessage } from '~/components/ui/ErrorMessage'

import SinglePost, { PostFragment } from '../Post/SinglePost'
import { UserFeedQuery } from './__generated__/Feed.generated'

const USER_FEED_QUERY = gql`
  query UserFeedQuery($after: String, $username: String!) {
    user(username: $username) {
      id
      posts(first: 10, after: $after) {
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
  }
  ${PostFragment}
`

interface Props {
  user: User
}

const UserFeed: React.FC<Props> = ({ user }) => {
  const { data, loading, error, fetchMore } = useQuery<UserFeedQuery>(
    USER_FEED_QUERY,
    {
      variables: {
        after: null,
        username: user?.username
      }
    }
  )

  const posts = data?.user?.posts?.edges?.map((edge) => edge?.node)
  const pageInfo = data?.user?.posts?.pageInfo

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
          <EmptyState
            message={
              <div>
                <span className="font-bold mr-1">@{user?.username}</span>
                <span>seems like not posted yet!</span>
              </div>
            }
            icon={<CollectionIcon className="h-8 w-8" />}
          />
        ) : (
          posts?.map((post: any) => (
            <SinglePost key={post?.id} post={post} showParent />
          ))
        )}
        <div ref={observe}></div>
      </div>
    </div>
  )
}

export default UserFeed
