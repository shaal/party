import { prisma } from '@utils/prisma'

import { Session } from '.prisma/client'

export const getSessions = async (
  query: any,
  session: Session | null | undefined
) => {
  return await prisma.session.findMany({
    ...query,
    where: { userId: session?.userId },
    orderBy: { createdAt: 'desc' }
  })
}
