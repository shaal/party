import { gql, useQuery } from '@apollo/client'
import React from 'react'

import PostShimmer from '~/components/shared/Shimmer/PostShimmer'

import { ErrorMessage } from '../ui/ErrorMessage'
import { PostsQuery } from './__generated__/index.generated'
import SinglePost from './SinglePost'

export const query = gql`
  query PostsQuery {
    posts {
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
  const { data, loading, error } = useQuery<PostsQuery>(query)

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
      </div>
    </div>
  )
}

export default Posts
