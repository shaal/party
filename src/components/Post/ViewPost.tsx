import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'

import PostShimmer from '~/components/shared/Shimmer/PostShimmer'
import UserProfileShimmer from '~/components/shared/Shimmer/UserProfileShimmer'
import UserCard from '~/components/shared/UserCard'
import { Card, CardBody } from '~/components/ui/Card'
import { ErrorMessage } from '~/components/ui/ErrorMessage'
import AppContext from '~/components/utils/AppContext'

import { Post, User } from '../../__generated__/schema.generated'
import { GridItemEight, GridItemFour, GridLayout } from '../GridLayout'
import { PostQuery } from './__generated__/ViewPost.generated'
import PostMod from './Mod'
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
  const { currentUser, staffMode } = useContext(AppContext)
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
          {!loading && <NewReply post={data?.post as Post} />}
          <Replies post={data?.post as Post} />
        </div>
      </GridItemEight>
      <GridItemFour>
        <UserCard user={data?.post?.user as User} />
        {currentUser?.isStaff && staffMode && (
          <PostMod post={data?.post as Post} />
        )}
      </GridItemFour>
    </GridLayout>
  )
}

export default ViewPost
