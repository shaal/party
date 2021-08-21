import { gql, useQuery } from '@apollo/client'
import PostShimmer from '~/components/shared/Shimmer/PostShimmer'
import { EmptyState } from '~/components/ui/EmptyState'
import { ErrorMessage } from '~/components/ui/ErrorMessage'
import { CollectionIcon } from '@heroicons/react/outline'
import React from 'react'
import useInView from 'react-cool-inview'

import SinglePost, { PostFragment } from '../Post/SinglePost'
import { TopicFeedQuery } from './__generated__/Feed.generated'

export const TOPIC_FEED_QUERY = gql`
  query TopicFeedQuery($after: String, $name: String!) {
    topic(name: $name) {
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
  topic: string
}

const TopicFeed: React.FC<Props> = ({ topic }) => {
  const { data, loading, error, fetchMore } = useQuery<TopicFeedQuery>(
    TOPIC_FEED_QUERY,
    {
      variables: {
        name: topic,
        after: null
      }
    }
  )
  const posts = data?.topic?.posts?.edges?.map((edge) => edge?.node)
  const pageInfo = data?.topic?.posts?.pageInfo

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

export default TopicFeed
