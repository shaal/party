import { db } from '~/utils/prisma'

export const hasLiked = async (
  userId: string,
  postId: string | null,
  replyId: string | null
) => {
  const count: number = await db.like.count({
    where: { userId, postId, replyId }
  })

  return count === 0 ? false : true
}
