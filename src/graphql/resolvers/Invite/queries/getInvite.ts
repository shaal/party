import { db } from '~/utils/prisma'

export const getInvite = async (query: any) => {
  return await db.user.findMany({
    ...query,
    where: { spammy: false },
    orderBy: { createdAt: 'desc' }
  })
}
