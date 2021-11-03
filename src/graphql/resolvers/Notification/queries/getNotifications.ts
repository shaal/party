import { Session } from '@prisma/client'
import { db } from '@utils/prisma'

/**
 * Get all notification belongs to the user
 * @param query - Contains an include object to pre-load data needed to resolve nested parts.
 * @param isRead - Flag to get only read notification
 * @param session - Current user session
 * @returns the notification belongs to the user
 */
export const getNotifications = async (
  query: Record<string, unknown>,
  isRead: boolean,
  session: Session | null | undefined
) => {
  return await db.notification.findMany({
    ...query,
    where: {
      receiver: { id: session?.userId },
      isRead
    },
    orderBy: { createdAt: 'desc' }
  })
}
