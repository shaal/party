import { PostType } from '@prisma/client'

import { WherePostsInput } from '~/__generated__/schema.generated'
import { prisma } from '~/utils/prisma'

export const getPosts = async (
  query: any,
  where: WherePostsInput | null | undefined
) => {
  return await prisma.post.findMany({
    ...query,
    where: {
      type: where?.type === 'ALL' ? undefined : (where?.type as PostType),
      user: {
        id: where?.userId as string,
        spammy: false
      },
      product: {
        id: where?.productId as string
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}
