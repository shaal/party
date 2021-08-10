import { gql, useQuery } from '@apollo/client'
import React from 'react'

import { Post } from '~/__generated__/schema.generated'
import Username from '~/components/shared/Username'
import { ErrorMessage } from '~/components/ui/ErrorMessage'

import { PostRepliesQuery } from './__generated__/Replies.generated'

const query = gql`
  query PostRepliesQuery($where: WhereRepliesInput) {
    replies(first: 5, where: $where) {
      edges {
        node {
          id
          body
          createdAt
          user {
            id
            username
            profile {
              name
              avatar
            }
          }
        }
      }
    }
  }
`

const RepliesCard: React.FC<React.ReactNode> = ({ children }) => (
  <div className="bg-gray-100 dark:bg-gray-800 border dark:border-gray-700 p-5 rounded-lg">
    {children}
  </div>
)

interface Props {
  post: Post
}

const PostReplies: React.FC<Props> = ({ post }) => {
  const { data, loading, error } = useQuery<PostRepliesQuery>(query, {
    variables: {
      where: {
        postId: post?.id
      }
    }
  })

  if (loading) return <div className="space-y-3">Loading</div>

  return (
    <RepliesCard>
      <ErrorMessage title="Failed to load posts" error={error} />
      <div className="space-y-4">
        {data?.replies?.edges?.map((reply: any) => (
          <div key={reply?.node?.id}>
            <div className="flex items-center space-x-1.5 mb-2">
              <img
                src={reply?.node?.user?.profile?.avatar}
                className="h-5 w-5 rounded-full"
                alt={`@${reply?.node?.user?.username}'s avatar`}
              />
              <div className="text-sm flex items-center space-x-1">
                <div>{reply?.node?.user?.profile?.name}</div>
                <Username username={reply?.node?.user?.username} />
              </div>
            </div>
            <div className="bg-gray-200 dark:bg-gray-700 border border-gray-300 px-2.5 py-1 rounded-lg inline-flex shadow-sm">
              {reply?.node?.body}
            </div>
          </div>
        ))}
      </div>
    </RepliesCard>
  )
}

export default PostReplies
