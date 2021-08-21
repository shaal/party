import { prisma } from '@utils/prisma'

import { WhereRepliesInput } from '../../../../__generated__/schema.generated'

export const getReplies = async (
  query: any,
  where: WhereRepliesInput | null | undefined
) => {
  return await prisma.reply.findMany({
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
