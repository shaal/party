import { PostType, Session } from '@prisma/client'
import { db } from '@utils/prisma'

export const homeFeed = async (
  query: any,
  type: string,
  session: Session | null | undefined
) => {
  const following = await db.user.findUnique({
    where: { id: session?.userId },
    select: { following: { select: { id: true } } }
  })

  return await db.post.findMany({
    ...query,
    where: {
      type: type === 'ALL' ? undefined : (type as PostType),
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
      },
      hidden: false
    },
    orderBy: { createdAt: 'desc' }
  })
}
