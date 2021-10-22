import { gql, useQuery } from '@apollo/client'
import SinglePost, { PostFragment } from '@components/Post/SinglePost'
import PostsShimmer from '@components/shared/Shimmer/PostsShimmer'
import { EmptyState } from '@components/ui/EmptyState'
import { ErrorMessage } from '@components/ui/ErrorMessage'
import { Spinner } from '@components/ui/Spinner'
import { BookmarkIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import React from 'react'
import useInView from 'react-cool-inview'

import { BookmarkFeedQuery } from './__generated__/Feed.generated'

const BOOKMARK_FEED_QUERY = gql`
  query BookmarkFeedQuery($after: String) {
    me {
      id
      bookmarks(first: 10, after: $after) {
        totalCount
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          node {
            post {
              ...PostFragment
            }
          }
        }
      }
    }
  }
  ${PostFragment}
`
const BookmarkFeed: React.FC = () => {
  const router = useRouter()
  const { data, loading, error, fetchMore } = useQuery<BookmarkFeedQuery>(
    BOOKMARK_FEED_QUERY,
    {
      variables: { after: null },
      skip: !router.isReady
    }
  )

  const bookmarks = data?.me?.bookmarks?.edges?.map((edge) => edge?.node)
  const pageInfo = data?.me?.bookmarks?.pageInfo

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
        {data?.me?.bookmarks?.totalCount === 0 ? (
          <EmptyState
            message={<div>You dont seems like any bookmarks yet!</div>}
            icon={<BookmarkIcon className="h-8 w-8 text-brand-500" />}
          />
        ) : (
          bookmarks?.map((bookmark: any) => (
            <SinglePost
              key={bookmark?.post?.id}
              post={bookmark?.post}
              showParent
            />
          ))
        )}
        {pageInfo?.hasNextPage && (
          <span ref={observe} className="flex justify-center p-5">
            <Spinner size="md" />
          </span>
        )}
      </div>
    </>
  )
}

export default BookmarkFeed
