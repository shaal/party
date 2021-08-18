import { WherePostsInput } from '../../../__generated__/schema.generated'
import { db } from '../../../utils/prisma'
import { PostType, Session } from '.prisma/client'

export const homeFeed = async (
  query: any,
  where: WherePostsInput | null | undefined,
  session: Session | null | undefined
) => {
  if (session) {
    const following = await db.user.findUnique({
      where: { id: session?.userId },
      select: { following: { select: { id: true } } }
    })

    return await db.post.findMany({
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
    return await db.post.findMany({
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
