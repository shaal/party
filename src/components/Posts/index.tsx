import { gql, useQuery } from '@apollo/client'
import { PostsQuery } from './__generated__/index.generated'
import { ErrorMessage } from '../ui/ErrorMessage'
import SinglePost from './SinglePost'
import PostShimmer from '~/components/shared/Shimmer/PostShimmer'
import React from 'react'

export const query = gql`
  query PostsQuery {
    posts {
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
        {data && data.posts.length === 0 ? (
          <div>Nothing here</div>
        ) : (
          data?.posts.map((post: any) => (
            <SinglePost key={post?.id} post={post} />
          ))
        )}
      </div>
    </div>
  )
}

export default Posts
