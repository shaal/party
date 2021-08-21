import { PostType, Session } from '@prisma/client'
import { prisma } from '@utils/prisma'

import { WherePostsInput } from '../../../../__generated__/schema.generated'

export const homeFeed = async (
  query: any,
  where: WherePostsInput | null | undefined,
  session: Session | null | undefined
) => {
  if (session) {
    const following = await prisma.user.findUnique({
      where: { id: session?.userId },
      select: { following: { select: { id: true } } }
    })

    return await prisma.post.findMany({
      ...query,
      where: {
        type: where?.type === 'ALL' ? undefined : (where?.type as PostType),
        user: {
          // @ts-ignore
          id: {
            in: [
              // @ts-ignore
              ...following.following.map((user) => user.id),
              session?.userId
            ]
          },
          spammy: false
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  } else {
    return await prisma.post.findMany({
      ...query,
      where: {
        type: where?.type === 'ALL' ? undefined : (where?.type as PostType)
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }
}
