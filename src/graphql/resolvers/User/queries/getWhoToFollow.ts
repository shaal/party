import { db } from '~/utils/prisma'

export const getWhoToFollow = async (query: any) => {
  return await db.user.findMany({
    ...query,
    take: 5,
    where: { spammy: false },
    orderBy: { createdAt: 'desc' }
  })
}
