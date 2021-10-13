import { db } from '@utils/prisma'

/**
 * Check the given post is liked or not
 * @param userId - Current user id
 * @param postId - Post id to check whether it is liked
 * @returns is liked or not
 */
export const hasLiked = async (userId: string, postId: string | null) => {
  const count: number = await db.like.count({
    where: { userId, postId }
  })

  return count === 0 ? false : true
}
