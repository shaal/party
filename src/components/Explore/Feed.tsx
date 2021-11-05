import { gql, useQuery } from '@apollo/client'
import SinglePost, { PostFragment } from '@components/Post/SinglePost'
import PostsShimmer from '@components/shared/Shimmer/PostsShimmer'
import { ErrorMessage } from '@components/UI/ErrorMessage'
import { Spinner } from '@components/UI/Spinner'
import { ExploreFeedQuery, Post } from '@graphql/types.generated'
import React from 'react'
import useInView from 'react-cool-inview'
import { POLLING_INTERVAL } from 'src/constants'

export const EXPLORE_FEED_QUERY = gql`
  query ExploreFeed($after: String) {
    posts: exploreFeed(first: 10, after: $after) {
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

const ExploreFeed: React.FC = () => {
  const { data, loading, error, fetchMore } = useQuery<ExploreFeedQuery>(
    EXPLORE_FEED_QUERY,
    { variables: { after: null }, pollInterval: POLLING_INTERVAL }
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

  if (loading) return <PostsShimmer />

  return (
    <div>
      <ErrorMessage title="Failed to load posts" error={error} />
      <div className="space-y-3">
        {posts?.map((post) => (
          <SinglePost key={post?.id} post={post as Post} showParent />
        ))}
        {pageInfo?.hasNextPage && (
          <span ref={observe} className="flex justify-center p-5">
            <Spinner size="md" />
          </span>
        )}
      </div>
    </div>
  )
}

export default ExploreFeed
