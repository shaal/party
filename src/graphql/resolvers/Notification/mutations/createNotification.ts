import { NotificationType } from '@prisma/client'
import { db } from '@utils/prisma'

export const createNotification = async (
  dispatcherId: any,
  receiverId: any,
  entityId: any,
  type: NotificationType
) => {
  new Promise((resolve, reject) => {
    db.notification
      .upsert({
        where: { entityId },
        update: { isRead: false, createdAt: new Date(), updatedAt: new Date() },
        create: {
          dispatcher: { connect: { id: dispatcherId } },
          receiver: { connect: { id: receiverId } },
          like:
            type === 'POST_LIKE' ? { connect: { id: entityId } } : undefined,
          product:
            type === 'PRODUCT_SUBSCRIBE'
              ? { connect: { id: entityId } }
              : undefined,
          entityId,
          type
        }
      })
      .then((value) => resolve(value))
      .catch((error) => reject(error))
  })
}
