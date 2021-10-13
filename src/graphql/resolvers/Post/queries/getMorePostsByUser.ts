import { db } from '@utils/prisma'

/**
 * Get more posts by given user
 * @param query - Contains an include object to pre-load data needed to resolve nested parts.
 * @param userId - Source user ID where to fetch their posts
 * @param type - Post Type
 * @returns the more posts by given user
 */
export const getMorePostsByUser = async (
  query: any,
  userId: string,
  type: string
) => {
  return await db.post.findMany({
    ...query,
    take: 5,
    where: {
      type: type,
      user: { id: userId, spammy: false }
    },
    orderBy: { createdAt: 'desc' }
  })
}
