import { gql, useQuery } from '@apollo/client'
import { GridItemEight, GridItemFour, GridLayout } from '@components/GridLayout'
import DevpartySEO from '@components/shared/SEO'
import PostShimmer from '@components/shared/Shimmer/PostShimmer'
import UserProfileShimmer from '@components/shared/Shimmer/UserProfileShimmer'
import UserCard from '@components/shared/UserCard'
import { Card, CardBody } from '@components/UI/Card'
import { ErrorMessage } from '@components/UI/ErrorMessage'
import AppContext from '@components/utils/AppContext'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { Post, User } from 'src/__generated__/schema.generated'
import Custom404 from 'src/pages/404'

import { PostQuery } from './__generated__/ViewPost.generated'
import MorePosts from './MorePosts'
import NewReply from './Reply/NewReply'
import Replies from './Reply/Replies'
import SinglePost, { PostFragment } from './SinglePost'

const PostMod = dynamic(() => import('./Mod'))
const MintNFT = dynamic(() => import('./MintNFT'), {
  loading: () => <div className="shimmer w-full h-15 rounded-lg" />
})

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
    variables: { id: router.query.postId },
    skip: !router.isReady
  })
  const post = data?.post

  if (!router.isReady || loading)
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

  if (!post) return <Custom404 />

  return (
    <GridLayout>
      <DevpartySEO
        title={`${post?.user?.profile?.name} on Devparty: ${
          post?.title ? post?.title : post?.body.slice(0, 255)
        }`}
        description={post?.body.slice(0, 255) as string}
        image={post?.user?.profile?.avatar as string}
        path={`/posts/${post?.id}`}
      />
      <GridItemEight>
        <div className="space-y-5">
          <ErrorMessage title="Failed to load post" error={error} />
          <SinglePost post={post as Post} showParent />
          {currentUser && !loading && <NewReply post={post as Post} />}
          <Replies post={post as Post} />
        </div>
      </GridItemEight>
      <GridItemFour>
        <div className="space-y-5">
          <UserCard user={post?.user as User} />
          {currentUser?.id === post?.user?.id && !post?.nft && (
            <MintNFT post={post as Post} />
          )}
          {currentUser?.isStaff && staffMode && <PostMod post={post as Post} />}
          {post?.type === 'QUESTION' && <MorePosts post={post as Post} />}
        </div>
      </GridItemFour>
    </GridLayout>
  )
}

export default ViewPost
