import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'

import { Post, User } from '~/__generated__/schema.generated'
import {
  GridItemEight,
  GridItemFour,
  GridLayout
} from '~/components/GridLayout'
import SinglePost, { PostFragment } from '~/components/Post/SinglePost'
import UserProfileLarge from '~/components/shared/UserProfileLarge'
import { Card, CardBody } from '~/components/ui/Card'
import { ErrorMessage } from '~/components/ui/ErrorMessage'

import PostShimmer from '../shared/Shimmer/PostShimmer'
import UserProfileLargeShimmer from '../shared/Shimmer/UserProfileLargeShimmer'
import AppContext from '../utils/AppContext'
import { PostQuery } from './__generated__/ViewPost.generated'
import NewReply from './Reply/NewReply'
import Replies from './Reply/Replies'

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
              <UserProfileLargeShimmer showFollow />
            </CardBody>
          </Card>
        </GridItemFour>
      </GridLayout>
    )

  if (!data) return <div>404</div>

  return (
    <GridLayout>
      <GridItemEight>
        <div className="space-y-5">
          <ErrorMessage title="Failed to load post" error={error} />
          {loading ? <PostShimmer /> : <SinglePost post={data?.post as Post} />}
          {!loading && currentUser && <NewReply post={data?.post as Post} />}
          {loading ? 'Loading' : <Replies post={data?.post as Post} />}
        </div>
      </GridItemEight>
      <GridItemFour>
        <Card>
          <CardBody>
            {loading ? (
              <UserProfileLargeShimmer showFollow />
            ) : (
              <UserProfileLarge user={data?.post?.user as User} showFollow />
            )}
          </CardBody>
        </Card>
      </GridItemFour>
    </GridLayout>
  )
}

export default ViewPost
