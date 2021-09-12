import { db } from '~/utils/prisma'

export const getBadges = async (query: any) => {
  return await db.badge.findMany({
    ...query,
    orderBy: { createdAt: 'desc' }
  })
}
