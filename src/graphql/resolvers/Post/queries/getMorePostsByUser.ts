import { prisma } from '@utils/prisma'

export const getMorePostsByUser = async (
  query: any,
  userId: string,
  type: string
) => {
  return await prisma.post.findMany({
    ...query,
    take: 5,
    where: {
      type: type,
      user: { id: userId, spammy: false }
    },
    orderBy: { createdAt: 'desc' }
  })
}
