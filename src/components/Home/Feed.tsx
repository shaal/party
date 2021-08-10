import { useQuery } from '@apollo/client'
import React from 'react'
import { useState } from 'react'
import useInView from 'react-cool-inview'

import PostShimmer from '~/components/shared/Shimmer/PostShimmer'

import SinglePost from '../Posts/SinglePost'
import { ErrorMessage } from '../ui/ErrorMessage'
import { HomeFeedQuery } from './__generated__/index.generated'

interface Props {
  feedType?: string
  onlyFollowing?: boolean
  query: any
}

const HomeFeed: React.FC<Props> = ({
  feedType,
  onlyFollowing = false,
  query
}) => {
  const [hasNextPage, setHasNextPage] = useState<boolean>(true)
  const { data, loading, error, fetchMore } = useQuery<HomeFeedQuery>(query, {
    variables: {
      after: null,
      where: {
        onlyFollowing,
        type: feedType === 'ALL' ? 'ALL' : feedType
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
      const endCursor = data?.posts?.pageInfo?.endCursor

      fetchMore({
        variables: {
          onlyFollowing,
          after: endCursor
        },
        // @ts-ignore
        updateQuery: (
          previousResult,
          { fetchMoreResult }: { fetchMoreResult: any }
        ) => {
          const previousEdges = previousResult?.posts?.edges
          const newEdges = fetchMoreResult?.posts?.edges
          const pageInfo = fetchMoreResult?.posts?.pageInfo
          setHasNextPage(pageInfo?.hasNextPage)
          if (!fetchMoreResult) return previousResult
          return {
            posts: { edges: [...previousEdges, ...newEdges], pageInfo }
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
        {data?.posts?.edges?.length === 0 ? (
          <div>Nothing here</div>
        ) : (
          data?.posts?.edges?.map((post: any) => (
            <SinglePost key={post?.node?.id} post={post?.node} />
          ))
        )}
        {hasNextPage && <div ref={observe}></div>}
      </div>
    </div>
  )
}

export default HomeFeed
