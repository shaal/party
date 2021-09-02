import { gql, useQuery } from '@apollo/client'
import { CollectionIcon } from '@heroicons/react/outline'
import React, { Fragment } from 'react'
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
        totalCount
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
  feedType: string
}

const UserFeed: React.FC<Props> = ({ user, feedType }) => {
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
            after: pageInfo?.endCursor ? pageInfo?.endCursor : null
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
    <Fragment>
      <ErrorMessage title="Failed to load posts" error={error} />
      <div className="space-y-3">
        {data?.user?.posts?.totalCount === 0 ? (
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
        <span ref={observe}></span>
      </div>
    </Fragment>
  )
}

export default UserFeed
