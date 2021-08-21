import { gql, useQuery } from '@apollo/client'
import { EmptyState } from '@components/ui/EmptyState'
import { ErrorMessage } from '@components/ui/ErrorMessage'
import { CollectionIcon } from '@heroicons/react/outline'
import React, { useEffect } from 'react'
import useInView from 'react-cool-inview'

import PostShimmer from '../../components/shared/Shimmer/PostShimmer'
import SinglePost, { PostFragment } from '../Post/SinglePost'
import { HomeFeedQuery } from './__generated__/Feed.generated'

export const HOME_FEED_QUERY = gql`
  query HomeFeedQuery($after: String, $where: WhereHomeFeedInput) {
    homeFeed(first: 10, after: $after, where: $where) {
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
  const { data, loading, error, refetch, fetchMore } = useQuery<HomeFeedQuery>(
    HOME_FEED_QUERY,
    {
      variables: {
        after: null,
        where: {
          type: feedType
        }
      },
      pollInterval: 10_000
    }
  )
  const posts = data?.homeFeed?.edges?.map((edge) => edge?.node)
  const pageInfo = data?.homeFeed?.pageInfo

  useEffect(() => {
    refetch()
  }, [feedType, refetch])

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
            message="No posts found, follow some users!"
            icon={<CollectionIcon className="h-8 w-8" />}
          />
        ) : (
          posts?.map((post: any) => <SinglePost key={post?.id} post={post} />)
        )}
        <div ref={observe}></div>
      </div>
    </div>
  )
}

export default HomeFeed
