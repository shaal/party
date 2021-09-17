import { NotificationType } from '@prisma/client'
import { prisma } from '@utils/prisma'

export const createNotification = async (
  dispatcherId: any,
  receiverId: any,
  entityId: any,
  type: NotificationType
) => {
  return await prisma.notification.create({
    data: {
      dispatcher: { connect: { id: dispatcherId } },
      receiver: { connect: { id: receiverId } },
      like: type === 'POSTLIKE' ? { connect: { id: entityId } } : undefined,
      type
    }
  })
}
