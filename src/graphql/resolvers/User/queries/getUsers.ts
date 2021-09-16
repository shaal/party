import { db } from '@utils/prisma'

export const getUsers = async (query: any) => {
  return await db.user.findMany({
    ...query,
    where: { spammy: false, inWaitlist: false },
    orderBy: { createdAt: 'desc' }
  })
}
