import { db } from '~/utils/prisma'

export const exploreFeed = async (query: any) => {
  return await db.post.findMany({
    ...query,
    where: { user: { spammy: false } },
    orderBy: {
      createdAt: 'desc'
    }
  })
}
