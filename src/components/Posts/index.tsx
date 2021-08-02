import Link from 'next/link'
import { gql, useQuery } from '@apollo/client'
import { PostsQuery } from './__generated__/index.generated'
import { Shimmer } from '../ui/Shimmer'
import { ErrorMessage } from '../ui/ErrorMessage'
import { Empty } from '../ui/Empty'
import { GridLayout } from '../ui/GridLayout'

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
    <GridLayout>
      <div className="space-y-2 mt-2">
        {loading && <Shimmer />}

        <ErrorMessage title="Failed to load posts" error={error} />

        {data && data.posts.length === 0 ? (
          <Empty />
        ) : (
          data?.posts.map((post) => (
            <Link key={post.id} href={`/posts/${post.id}`}>
              <a className="flex items-center justify-between space-x-2 rounded p-4 hover:bg-gray-500 hover:bg-opacity-20 w-full">
                <div className="truncate">{post.text}</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </Link>
          ))
        )}
      </div>
    </GridLayout>
  )
}
