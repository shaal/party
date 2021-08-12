import { db } from 'src/utils/prisma'

import { hasLiked } from './hasLiked'

export const togglePostLike = async (
  query: any,
  userId: string,
  postId: string
) => {
  if (await hasLiked(userId, postId, null)) {
    await db.like.deleteMany({
      where: { userId, postId }
    })
  } else {
    await db.like.create({
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
