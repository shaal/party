import { db } from '~/utils/prisma'

export const getUsers = async (query: any) => {
  return await db.user.findMany({
    ...query,
    where: { spammy: false, inWaitlist: true },
    orderBy: { createdAt: 'desc' }
  })
}
