import { gql, useQuery } from '@apollo/client'
import SinglePost, { PostFragment } from '@components/Post/SinglePost'
import PostsShimmer from '@components/shared/Shimmer/PostsShimmer'
import { EmptyState } from '@components/UI/EmptyState'
import { ErrorMessage } from '@components/UI/ErrorMessage'
import { Spinner } from '@components/UI/Spinner'
import { HashtagIcon } from '@heroicons/react/outline'
import React from 'react'
import useInView from 'react-cool-inview'
import { Post } from 'src/__generated__/schema.generated'
import { POLLING_INTERVAL } from 'src/constants'

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
        after: null,
        name: topic
      },
      skip: !topic,
      pollInterval: POLLING_INTERVAL
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
        {posts?.length === 0 ? (
          <EmptyState
            message={
              <div>
                <span>No posts found in</span>
                <span className="font-bold ml-1">{topic}</span>
              </div>
            }
            icon={<HashtagIcon className="h-8 w-8 text-brand-500" />}
          />
        ) : (
          posts?.map((post) => (
            <SinglePost key={post?.id} post={post as Post} showParent />
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

export default TopicFeed
