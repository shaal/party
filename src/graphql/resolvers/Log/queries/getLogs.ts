import { Session } from '@prisma/client'
import { db } from '@utils/prisma'

export const getLogs = async (
  query: any,
  session: Session | null | undefined
) => {
  return await db.log.findMany({
    ...query,
    where: { user: { id: session?.userId } },
    orderBy: { createdAt: 'desc' }
  })
}
