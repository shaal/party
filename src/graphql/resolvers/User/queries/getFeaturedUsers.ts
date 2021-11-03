import { db } from '@utils/prisma'

/**
 * Get list of featured users
 * @param query - Contains an include object to pre-load data needed to resolve nested parts.
 * @returns list of featured users
 */
export const getFeaturedUsers = async (query: Record<string, unknown>) => {
  return await db.user.findMany({
    ...query,
    take: 5,
    where: {
      spammy: false,
      inWaitlist: false,
      featuredAt: { not: null }
    },
    orderBy: [
      { featuredAt: 'desc' },
      { followedBy: { _count: 'desc' } },
      { posts: { _count: 'desc' } },
      { isVerified: 'desc' },
      { updatedAt: 'desc' },
      { following: { _count: 'desc' } }
    ]
  })
}
