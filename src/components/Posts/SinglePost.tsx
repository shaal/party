import Link from 'next/link'
import { gql, useQuery } from '@apollo/client'
import { PostsQuery } from './__generated__/index.generated'
import { Shimmer } from '../ui/Shimmer'
import { ErrorMessage } from '../ui/ErrorMessage'
import { Empty } from '../ui/Empty'
import { GridLayout } from '../ui/GridLayout'
import React from 'react'
import { Post } from '~/__generated__/schema.generated'
import { Card, CardBody } from '../ui/Card'

interface Props {
  post: Post
}

export const SinglePost: React.FC<Props> = ({ post }) => {
  return (
    <Card>
      <CardBody>
        <div>
          <Link key={post.id} href={`/posts/${post.id}`}>
            <a>
              <div>{post.text}</div>
            </a>
          </Link>
        </div>
      </CardBody>
    </Card>
  )
}
