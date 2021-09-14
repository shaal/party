import { gql, useQuery } from '@apollo/client'
import { CollectionIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import React from 'react'

import { Post } from '~/__generated__/schema.generated'
import { Card, CardBody } from '~/components/ui/Card'

import { ErrorMessage } from '../ui/ErrorMessage'
import { MorePostsByUserQuery } from './__generated__/MorePosts.generated'

export const MORE_POSTS_BY_USER_QUERY = gql`
  query MorePostsByUserQuery($userId: ID!, $type: String!) {
    morePostsByUser(userId: $userId, type: $type) {
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
const MorePostsCard = ({ title, children }: any) => {
  return (
    <div className="mb-4">
      <div className="mb-2 flex items-center gap-2">
        <CollectionIcon className="h-4 w-4" />
        <div>More by {title}</div>
      </div>
      <Card>
        <CardBody className="space-y-5">{children}</CardBody>
      </Card>
    </div>
  )
}

const MorePosts: React.FC<Props> = ({ post }) => {
  const { data, error } = useQuery<MorePostsByUserQuery>(
    MORE_POSTS_BY_USER_QUERY,
    {
      variables: {
        userId: post?.user?.id,
        type: 'QUESTION'
      },
      skip: !post?.user?.id
    }
  )
  const posts = data?.morePostsByUser?.edges?.map((edge) => edge?.node)

  return (
    <MorePostsCard title={post?.user?.profile?.name}>
      <ErrorMessage title="Failed to load more posts" error={error} />
      {posts?.map((post: any) => (
        <div key={post?.id} className="space-y-2">
          <div>{post?.title}</div>
          <div className="flex items-start space-x-1 text-sm">
            <img
              className="h-5 w-5 rounded-full"
              src={post?.user?.profile?.avatar}
              alt={`@${post?.user?.profile?.avatar}'s avatar'`}
            />
            <Link href={`/@/${post?.user?.username}`}>
              <a>{post?.user?.profile?.name}</a>
            </Link>
          </div>
        </div>
      ))}
    </MorePostsCard>
  )
}

export default MorePosts
