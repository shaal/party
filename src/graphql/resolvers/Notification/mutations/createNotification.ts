import { NotificationType } from '@prisma/client'
import { db } from '@utils/prisma'

/**
 * Creates a notification
 * @param dispatcherId - The source user who is responsible for the notification
 * @param receiverId - The target user who going to consume the notification
 * @param entityId - Entity id in which the action is performed
 * @param type - Type of the notification
 */
export const createNotification = (
  dispatcherId: string,
  receiverId: string,
  entityId: string,
  type: NotificationType
): void => {
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
          post:
            type === 'POST_REPLY' ? { connect: { id: entityId } } : undefined,
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
