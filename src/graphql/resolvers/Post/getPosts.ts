import { WherePostsInput } from '../../../__generated__/schema.generated'
import { db } from '../../../utils/prisma'
import { PostType } from '.prisma/client'

export const getPosts = async (
  query: any,
  where: WherePostsInput | null | undefined
) => {
  return await db.post.findMany({
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
