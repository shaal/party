import { NotificationType } from '@prisma/client'

import { prisma } from '../../../utils/prisma'

export const createNotification = async (
  receiverId: string,
  dispatcherId: string,
  entityId: string,
  type: NotificationType
) => {
  if (receiverId !== dispatcherId) {
    return await prisma.notification.create({
      data: {
        receiverId,
        dispatcherId,
        entityId,
        type: type as NotificationType
      }
    })
  }
}
