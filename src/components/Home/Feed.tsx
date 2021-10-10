import { gql, useQuery } from '@apollo/client'
import SinglePost, { PostFragment } from '@components/Post/SinglePost'
import PostsShimmer from '@components/shared/Shimmer/PostsShimmer'
import { Card, CardBody } from '@components/ui/Card'
import { EmptyState } from '@components/ui/EmptyState'
import { ErrorMessage } from '@components/ui/ErrorMessage'
import { OfflineState } from '@components/ui/OfflineState'
import { Spinner } from '@components/ui/Spinner'
import { useIsOffline } from '@components/utils/useOnlineStatus'
import { CollectionIcon } from '@heroicons/react/outline'
import React from 'react'
import useInView from 'react-cool-inview'
import { POLLING_INTERVAL } from 'src/constants'

import { HomeFeedQuery } from './__generated__/Feed.generated'

export const HOME_FEED_QUERY = gql`
  query HomeFeedQuery($after: String, $type: String!) {
    posts: homeFeed(first: 10, after: $after, type: $type) {
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
}

const HomeFeed: React.FC<Props> = ({ feedType }) => {
  const isOffline = useIsOffline()
  const { data, loading, error, fetchMore } = useQuery<HomeFeedQuery>(
    HOME_FEED_QUERY,
    {
      variables: {
        after: null,
        type: feedType
      },
      pollInterval: POLLING_INTERVAL
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
            after: pageInfo?.endCursor ? pageInfo?.endCursor : null
          }
        })
      }
    }
  })

  if (isOffline)
    return (
      <Card>
        <CardBody>
          <OfflineState />
        </CardBody>
      </Card>
    )

  if (loading) return <PostsShimmer />

  return (
    <div>
      <ErrorMessage title="Failed to load posts" error={error} />
      <div className="space-y-3">
        {posts?.length === 0 ? (
          <EmptyState
            message="No posts found, follow some users!"
            icon={<CollectionIcon className="h-8 w-8" />}
          />
        ) : (
          posts?.map((post: any) => (
            <SinglePost key={post?.id} post={post} showParent />
          ))
        )}
        {pageInfo?.hasNextPage && (
          <span ref={observe} className="flex justify-center p-5">
            <Spinner size="md" />
          </span>
        )}
      </div>
    </div>
  )
}

export default HomeFeed
