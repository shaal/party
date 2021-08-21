import { prisma } from '@utils/prisma'

export const getUsers = async (query: any) => {
  return await prisma.user.findMany({
    ...query,
    where: { spammy: false },
    orderBy: { createdAt: 'desc' }
  })
}
