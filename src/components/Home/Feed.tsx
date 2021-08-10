import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { useState } from 'react'
import useInView from 'react-cool-inview'

import PostShimmer from '~/components/shared/Shimmer/PostShimmer'

import SinglePost, { PostFragment } from '../Post/SinglePost'
import { ErrorMessage } from '../ui/ErrorMessage'
import { HomeFeedQuery } from './__generated__/Feed.generated'

const query = gql`
  query HomeFeedQuery($after: String, $where: WherePostsInput) {
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
  onlyFollowing?: boolean
}

const HomeFeed: React.FC<Props> = ({ feedType, onlyFollowing = false }) => {
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

export default HomeFeed
