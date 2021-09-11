import { WhereMorePostsByUserInput } from '~/__generated__/schema.generated'
import { db } from '~/utils/prisma'

export const getMorePostsByUser = async (
  query: any,
  where: WhereMorePostsByUserInput | null | undefined
) => {
  return await db.post.findMany({
    ...query,
    take: 5,
    where: {
      type: where?.type,
      user: {
        id: where?.userId as string,
        spammy: false
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}
