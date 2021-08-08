import { db } from '~/utils/prisma'

import { hasLiked } from './hasLiked'

export const toggleLike = async (
  query: any,
  userId: string,
  postId: string
) => {
  if (await hasLiked(userId, postId)) {
    await db.like.deleteMany({
      ...query,
      where: { userId, postId }
    })
  } else {
    await db.like.create({
      ...query,
      data: {
        post: { connect: { id: postId } },
        user: { connect: { id: userId } }
      }
    })
  }

  return await db.post.findUnique({
    ...query,
    where: { id: postId }
  })
}
