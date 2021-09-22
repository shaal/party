import { Session } from '@prisma/client'
import { db } from '@utils/prisma'

export const getNotifications = async (
  query: any,
  session: Session | null | undefined
) => {
  return await db.notification.findMany({
    ...query,
    where: {
      receiverId: session?.userId,
      isRead: false
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}
