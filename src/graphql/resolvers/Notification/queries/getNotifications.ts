import { Session } from '@prisma/client'
import { db } from '@utils/prisma'

export const getNotifications = async (
  query: any,
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
