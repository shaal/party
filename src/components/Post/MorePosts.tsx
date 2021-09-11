import { gql, useQuery } from '@apollo/client'
import React from 'react'

import { Post } from '~/__generated__/schema.generated'
import { Card, CardBody } from '~/components/ui/Card'

import { ErrorMessage } from '../ui/ErrorMessage'
import { MorePostsByUserQuery } from './__generated__/MorePosts.generated'

export const MORE_POSTS_BY_USER_QUERY = gql`
  query MorePostsByUserQuery($where: WhereMorePostsByUserInput!) {
    morePostsByUser(where: $where) {
      edges {
        node {
          id
          title
          user {
            id
            username
            profile {
              id
              name
              avatar
            }
          }
        }
      }
    }
  }
`

interface Props {
  post: Post
}

const MorePosts: React.FC<Props> = ({ post }) => {
  const { data, loading, error } = useQuery<MorePostsByUserQuery>(
    MORE_POSTS_BY_USER_QUERY,
    {
      variables: {
        where: {
          userId: post?.user?.id,
          type: 'QUESTION'
        }
      },
      skip: !post?.user?.id
    }
  )
  const posts = data?.morePostsByUser?.edges?.map((edge) => edge?.node)

  if (loading) return <div>Loading More Posts</div>

  return (
    <Card>
      <CardBody className="space-y-5">
        <ErrorMessage title="Failed to load more posts" error={error} />
        {posts?.map((post: any) => (
          <div key={post?.id} className="space-y-2">
            <div className="font-bold">{post?.title}</div>
            <div className="flex items-start space-x-1 text-sm">
              <img
                className="h-5 w-5 rounded-full"
                src={post?.user?.profile?.avatar}
                alt={`@${post?.user?.profile?.avatar}'s avatar'`}
              />
              <div>{post?.user?.profile?.name}</div>
            </div>
          </div>
        ))}
      </CardBody>
    </Card>
  )
}

export default MorePosts
