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
        wheere: {
          userId: post?.user?.id,
          type: 'QUESTION'
        }
      },
      skip: !post?.user?.id
    }
  )

  if (loading) return <div>Loading More Posts</div>

  return (
    <Card>
      <CardBody>
        <ErrorMessage title="Failed to load more posts" error={error} />
        {data?.morePostsByUser?.edges?.map((post: any) => (
          <div key={post?.node?.id}>
            <div>{post?.node?.title}</div>
          </div>
        ))}
      </CardBody>
    </Card>
  )
}

export default MorePosts
