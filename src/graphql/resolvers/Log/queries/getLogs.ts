import { Session } from '@prisma/client'
import { db } from '@utils/prisma'

/**
 * Get logs for the current user
 * @param query - Contains an include object to pre-load data needed to resolve nested parts.
 * @param session - Current user session
 * @returns the logs for the current user
 */
export const getLogs = async (
  query: Record<string, unknown>,
  session: Session | null | undefined
) => {
  return await db.log.findMany({
    ...query,
    where: { user: { id: session?.userId } },
    orderBy: { createdAt: 'desc' }
  })
}
