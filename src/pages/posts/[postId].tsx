import { gql, useQuery } from '@apollo/client'
import { SinglePost } from '@components/Posts/SinglePost'
import { PostQuery } from '@components/Posts/__generated__/ViewPost.generated'
import { Card, CardBody } from '@components/ui/Card'
import { ErrorMessage } from '@components/ui/ErrorMessage'
import {
  GridItemEight,
  GridItemFour,
  GridLayout
} from '@components/ui/GridLayout'
import Navbar from '@components/ui/Navbar'
import UserProfileLarge from '@components/ui/UserProfileLarge'
import AppContext from '@components/utils/AppContext'
import { Post, User } from '@__generated__/schema.generated'
import { useRouter } from 'next/router'
import React, { Fragment, useContext } from 'react'

export const query = gql`
  query PostQuery($id: ID!) {
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

const PostPage: React.FC = () => {
  const router = useRouter()
  const { currentUser } = useContext(AppContext)
  const { data, loading, error } = useQuery<PostQuery>(query, {
    variables: {
      id: router.query.postId
    },
    skip: !router.isReady
  })

  return (
    <Fragment>
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

export default PostPage
