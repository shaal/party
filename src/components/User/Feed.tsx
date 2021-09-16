import { gql, useQuery } from '@apollo/client'
import SinglePost, { PostFragment } from '@components/Post/SinglePost'
import PostsShimmer from '@components/shared/Shimmer/PostsShimmer'
import { EmptyState } from '@components/ui/EmptyState'
import { ErrorMessage } from '@components/ui/ErrorMessage'
import { CollectionIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import React from 'react'
import useInView from 'react-cool-inview'

import { UserFeedQuery } from './__generated__/Feed.generated'

const USER_FEED_QUERY = gql`
  query UserFeedQuery($after: String, $username: ID!) {
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
  feedType: string
}

// eslint-disable-next-line no-unused-vars
const UserFeed: React.FC<Props> = ({ feedType }) => {
  const router = useRouter()
  const { data, loading, error, fetchMore } = useQuery<UserFeedQuery>(
    USER_FEED_QUERY,
    {
      variables: {
        after: null,
        username: router.query.username
      },
      skip: !router.isReady
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

  if (loading) return <PostsShimmer />

  return (
    <>
      <ErrorMessage title="Failed to load posts" error={error} />
      <div className="space-y-3">
        {data?.user?.posts?.totalCount === 0 ? (
          <EmptyState
            message={
              <div>
                <span className="font-bold mr-1">@{router.query.username}</span>
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
        {pageInfo?.hasNextPage && <span ref={observe}></span>}
      </div>
    </>
  )
}

export default UserFeed
