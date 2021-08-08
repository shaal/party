import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { useState } from 'react'
import useInView from 'react-cool-inview'

import { User } from '~/__generated__/schema.generated'
import PostShimmer from '~/components/shared/Shimmer/PostShimmer'

import { ErrorMessage } from '../ui/ErrorMessage'
import { PostsQuery } from './__generated__/index.generated'
import SinglePost from './SinglePost'

interface Props {
  user?: User
}

export const query = gql`
  query PostsQuery($after: String, $where: WherePostsInput) {
    posts(first: 5, after: $after, where: $where) {
      pageInfo {
        endCursor
        hasNextPage
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

const Posts: React.FC<Props> = ({ user }) => {
  const [hasNextPage, setHasNextPage] = useState<boolean>(true)
  const { data, loading, error, fetchMore } = useQuery<PostsQuery>(query, {
    variables: {
      after: null,
      where: {
        userId: user?.id
      }
    }
  })

  const { observe } = useInView({
    threshold: 0.25,
    onChange: ({ observe, unobserve }) => {
      unobserve()
      observe()
    },
    onEnter: () => {
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
          setHasNextPage(pageInfo?.hasNextPage)
          if (!fetchMoreResult) return previousResult
          return {
            posts: {
              edges: [...previousResult?.posts?.edges, ...newPosts],
              pageInfo
            }
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

export default Posts
