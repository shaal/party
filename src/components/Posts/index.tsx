import Link from 'next/link'
import { gql, useQuery } from '@apollo/client'
import { PostsQuery } from './__generated__/index.generated'
import { Shimmer } from '../ui/Shimmer'
import { ErrorMessage } from '../ui/ErrorMessage'
import { Empty } from '../ui/Empty'
import { GridLayout } from '../ui/GridLayout'
import { SinglePost } from './SinglePost'
import NewPost from '~/pages/posts/new'

export const query = gql`
  query PostsQuery {
    posts {
      id
      text
    }
  }
`

export function Posts() {
  const { data, loading, error } = useQuery<PostsQuery>(query)

  return (
    <div>
      <NewPost />
      <ErrorMessage title="Failed to load posts" error={error} />
      <div className="space-y-3">
        {data && data.posts.length === 0 ? (
          <Empty />
        ) : (
          data?.posts.map((post: any) => (
            <SinglePost key={post?.id} post={post} />
          ))
        )}
      </div>
    </div>
  )
}
