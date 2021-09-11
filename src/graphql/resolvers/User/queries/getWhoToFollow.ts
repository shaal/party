import { db } from '~/utils/prisma'

import { Session } from '.prisma/client'

export const getWhoToFollow = async (
  query: any,
  session: Session | null | undefined
) => {
  return await db.user.findMany({
    ...query,
    take: 5,
    where: { spammy: false, id: { not: session?.userId } },
    orderBy: { createdAt: 'desc' }
  })
}
