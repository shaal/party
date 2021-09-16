import { db } from '@utils/prisma'

import { hasLiked } from '../../Like/queries/hasLiked'
import { createNotification } from '../../Notification/mutations/createNotification'

export const togglePostLike = async (
  query: any,
  userId: string,
  postId: string
) => {
  let like
  if (await hasLiked(userId, postId)) {
    await db.like.deleteMany({
      where: { userId, postId }
    })
  } else {
    like = await db.like.create({
      data: {
        post: { connect: { id: postId } },
        user: { connect: { id: userId } }
      }
    })
  }

  const post = await db.post.findUnique({
    ...query,
    where: { id: postId }
  })

  if (like && userId !== post?.userId) {
    createNotification(userId, post?.userId, like?.id, 'POSTLIKE')
  }

  return post
}
