import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'

import { Post, User } from '../../__generated__/schema.generated'
import { GridItemEight, GridItemFour, GridLayout } from '../GridLayout'
import PostShimmer from '../shared/Shimmer/PostShimmer'
import UserProfileShimmer from '../shared/Shimmer/UserProfileShimmer'
import UserProfile from '../shared/UserProfile'
import { Card, CardBody } from '../ui/Card'
import { ErrorMessage } from '../ui/ErrorMessage'
import AppContext from '../utils/AppContext'
import { PostQuery } from './__generated__/ViewPost.generated'
import NewReply from './Reply/NewReply'
import Replies from './Reply/Replies'
import SinglePost, { PostFragment } from './SinglePost'

export const POST_QUERY = gql`
  query PostQuery($id: ID!) {
    post(id: $id) {
      ...PostFragment
    }
  }
  ${PostFragment}
`

const ViewPost: React.FC = () => {
  const router = useRouter()
  const { currentUser } = useContext(AppContext)
  const { data, loading, error } = useQuery<PostQuery>(POST_QUERY, {
    variables: {
      id: router.query.postId
    },
    skip: !router.isReady
  })

  if (loading)
    return (
      <GridLayout>
        <GridItemEight>
          <PostShimmer />
        </GridItemEight>
        <GridItemFour>
          <Card>
            <CardBody>
              <UserProfileShimmer showFollow />
            </CardBody>
          </Card>
        </GridItemFour>
      </GridLayout>
    )

  return (
    <GridLayout>
      <GridItemEight>
        <div className="space-y-5">
          <ErrorMessage title="Failed to load post" error={error} />
          <SinglePost post={data?.post as Post} />
          {!loading && currentUser && <NewReply post={data?.post as Post} />}
          <Replies post={data?.post as Post} />
        </div>
      </GridItemEight>
      <GridItemFour>
        <Card>
          <CardBody>
            <UserProfile user={data?.post?.user as User} showFollow />
          </CardBody>
        </Card>
      </GridItemFour>
    </GridLayout>
  )
}

export default ViewPost
