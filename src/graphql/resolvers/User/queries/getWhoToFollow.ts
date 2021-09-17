import { prisma } from '@utils/prisma'

import { Session } from '.prisma/client'

export const getWhoToFollow = async (
  query: any,
  session: Session | null | undefined
) => {
  const following = await prisma.user.findFirst({
    where: { id: session?.userId, inWaitlist: false },
    select: { following: { select: { id: true } } }
  })

  return await prisma.user.findMany({
    ...query,
    take: 5,
    where: {
      spammy: false,
      inWaitlist: false,
      id: {
        // @ts-ignore
        notIn: [...following.following.map((user) => user.id), session?.userId]
      }
    },
    orderBy: [
      { followedBy: { _count: 'desc' } },
      { posts: { _count: 'desc' } },
      { isVerified: 'desc' },
      { updatedAt: 'desc' },
      { following: { _count: 'desc' } }
    ]
  })
}
