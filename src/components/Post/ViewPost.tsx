import { gql, useQuery } from '@apollo/client'
import { GridItemEight, GridItemFour, GridLayout } from '@components/GridLayout'
import DevpartySEO from '@components/shared/SEO'
import PostShimmer from '@components/shared/Shimmer/PostShimmer'
import UserProfileShimmer from '@components/shared/Shimmer/UserProfileShimmer'
import UserCard from '@components/shared/UserCard'
import { Card, CardBody } from '@components/ui/Card'
import { ErrorMessage } from '@components/ui/ErrorMessage'
import AppContext from '@components/utils/AppContext'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { Post, User } from 'src/__generated__/schema.generated'

import { PostQuery } from './__generated__/ViewPost.generated'
import PostMod from './Mod'
import MorePosts from './MorePosts'
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
      <DevpartySEO
        title={`${data?.post?.user?.profile?.name} on Devparty: ${
          data?.post?.title ? data?.post?.title : data?.post?.body.slice(0, 255)
        }`}
        description={data?.post?.body.slice(0, 255) as string}
        image={data?.post?.user?.profile?.avatar as string}
        path={`/posts/${data?.post?.id}`}
      />
      <GridItemEight>
        <div className="space-y-5">
          <ErrorMessage title="Failed to load post" error={error} />
          <SinglePost post={data?.post as Post} showParent />
          {currentUser && !loading && <NewReply post={data?.post as Post} />}
          <Replies post={data?.post as Post} />
        </div>
      </GridItemEight>
      <GridItemFour>
        <div className="space-y-5">
          <UserCard user={data?.post?.user as User} />
          {currentUser?.isStaff && staffMode && (
            <PostMod post={data?.post as Post} />
          )}
          {data?.post?.type === 'QUESTION' && (
            <MorePosts post={data?.post as Post} />
          )}
        </div>
      </GridItemFour>
    </GridLayout>
  )
}

export default ViewPost
