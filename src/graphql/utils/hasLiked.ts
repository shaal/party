import { db } from '~/utils/prisma'

export const hasLiked = async (userId: string, postId: string) => {
  const count: number = await db.like.count({
    where: { userId, postId }
  })

  return count === 0 ? false : true
}
