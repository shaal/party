import { gql, useQuery } from '@apollo/client'
import React from 'react'
import useInView from 'react-cool-inview'

import PostShimmer from '~/components/shared/Shimmer/PostShimmer'

import { Button } from '../ui/Button'
import { ErrorMessage } from '../ui/ErrorMessage'
import { PostsQuery } from './__generated__/index.generated'
import SinglePost from './SinglePost'

export const query = gql`
  query PostsQuery($after: String) {
    posts(first: 5, after: $after) {
      pageInfo {
        endCursor
      }
      edges {
        node {
          id
          title
          body
          done
          attachments
          type
          createdAt
          user {
            id
            username
            profile {
              name
            }
          }
        }
      }
    }
  }
`

const Posts: React.FC = () => {
  const { data, loading, error, fetchMore } = useQuery<PostsQuery>(query, {
    variables: {
      after: null
    }
  })

  const { observe, unobserve, inView, scrollDirection, entry } = useInView({
    threshold: 0.25,
    onChange: ({ inView, scrollDirection, entry, observe, unobserve }) => {
      unobserve()
      observe()
    },
    onEnter: ({ scrollDirection, entry, observe, unobserve }) => {
      const endCursor = data?.posts?.pageInfo?.endCursor

      fetchMore({
        variables: {
          after: endCursor
        },
        // @ts-ignore
        updateQuery: (
          previousResult,
          { fetchMoreResult }: { fetchMoreResult: any }
        ) => {
          const newPosts = fetchMoreResult?.posts?.edges
          const pageInfo = fetchMoreResult?.posts?.pageInfo

          return newPosts.length
            ? {
                posts: {
                  edges: [...previousResult?.posts?.edges, ...newPosts],
                  pageInfo
                }
              }
            : previousResult
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
        <Button ref={observe}>Load more</Button>
      </div>
    </div>
  )
}

export default Posts
