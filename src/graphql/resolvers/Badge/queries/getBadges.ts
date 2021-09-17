import { prisma } from '@utils/prisma'

export const getBadges = async (query: any) => {
  return await prisma.badge.findMany({
    ...query,
    orderBy: { createdAt: 'desc' }
  })
}
