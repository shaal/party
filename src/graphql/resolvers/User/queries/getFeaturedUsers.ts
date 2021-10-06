import { db } from '@utils/prisma'

export const getFeaturedUsers = async (query: any) => {
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
