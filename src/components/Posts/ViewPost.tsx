import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client'
import { ErrorMessage } from '../ui/ErrorMessage'
import { PostQuery } from './__generated__/ViewPost.generated'
import { GridItemEight, GridItemFour, GridLayout } from '../ui/GridLayout'
import { SinglePost } from './SinglePost'
import { Post, User } from '@__generated__/schema.generated'
import React, { Fragment } from 'react'
import Navbar from '../ui/Navbar'
import { Card, CardBody } from '../ui/Card'
import UserProfileLarge from '../ui/UserProfileLarge'

export const query = gql`
  query PostQuery($id: ID!) {
    me {
      id
      username
    }
    post(id: $id) {
      id
      text
      createdAt
      user {
        username
        profile {
          name
        }
      }
    }
  }
`

export const ViewPost: React.FC = () => {
  const router = useRouter()
  const { data, loading, error } = useQuery<PostQuery>(query, {
    variables: {
      id: router.query.postId
    },
    skip: !router.isReady
  })

  return (
    <Fragment>
      <Navbar currentUser={data?.me} />
      <GridLayout>
        <GridItemEight>
          <ErrorMessage title="Failed to load post" error={error} />
          <SinglePost post={data?.post as Post} />
        </GridItemEight>
        <GridItemFour>
          <Card>
            <CardBody>
              <UserProfileLarge user={data?.post?.user as User} />
            </CardBody>
          </Card>
        </GridItemFour>
      </GridLayout>
    </Fragment>
  )
}
