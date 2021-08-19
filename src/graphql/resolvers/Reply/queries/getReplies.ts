import { WhereRepliesInput } from '../../../../__generated__/schema.generated'
import { db } from '../../../../utils/prisma'

export const getReplies = async (
  query: any,
  where: WhereRepliesInput | null | undefined
) => {
  return await db.reply.findMany({
    ...query,
    where: {
      post: {
        id: where?.postId as string
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}
