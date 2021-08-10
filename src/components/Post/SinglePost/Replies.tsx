import { gql, useQuery } from '@apollo/client'
import React from 'react'

import { Post } from '~/__generated__/schema.generated'
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
      <div className="space-y-3">
        {data?.replies?.edges?.map((reply: any) => (
          <div key={reply?.node?.id} className="flex space-x-3">
            <img
              src={reply?.node?.user?.profile?.avatar}
              className="h-7 w-7 rounded-full"
              alt={`@${reply?.node?.user?.username}'s avatar`}
            />
            <div className="bg-gray-300 dark:bg-gray-700 px-2.5 py-1 rounded-lg">
              {reply?.node?.body}
            </div>
          </div>
        ))}
      </div>
    </RepliesCard>
  )
}

export default PostReplies
