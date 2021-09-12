import { db } from '~/utils/prisma'

import { Session } from '.prisma/client'

export const getSessions = async (
  query: any,
  session: Session | null | undefined
) => {
  return await db.session.findMany({
    ...query,
    where: { userId: session?.userId },
    orderBy: { createdAt: 'desc' }
  })
}
