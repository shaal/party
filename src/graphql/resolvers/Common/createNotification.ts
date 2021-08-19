import { NotificationType } from '@prisma/client'

import { db } from '../../../utils/prisma'

export const createNotification = async (
  receiverId: string,
  dispatcherId: string,
  entityId: string | null,
  type: NotificationType
) => {
  if (receiverId !== dispatcherId) {
    return await db.notification.create({
      data: {
        receiverId,
        dispatcherId,
        entityId,
        type: type as NotificationType
      }
    })
  }
}
