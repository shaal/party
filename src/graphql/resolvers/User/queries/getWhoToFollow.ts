import { db } from '~/utils/prisma'

import { Session } from '.prisma/client'

export const getWhoToFollow = async (
  query: any,
  session: Session | null | undefined
) => {
  const following = await db.user.findUnique({
    where: { id: session?.userId },
    select: { following: { select: { id: true } } }
  })

  return await db.user.findMany({
    ...query,
    take: 5,
    where: {
      spammy: false,
      id: {
        // @ts-ignore
        notIn: [...following.following.map((user) => user.id), session?.userId]
      }
    },
    orderBy: [{ followedBy: { _count: 'asc' } }, { posts: { _count: 'asc' } }]
  })
}
