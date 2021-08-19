import { NotificationType } from '@prisma/client'

import { db } from '../../../utils/prisma'

export const createNotification = async (
  receiverId: string,
  dispatcherId: string,
  type: NotificationType
) => {
  return await db.notification.create({
    data: {
      receiverId,
      dispatcherId,
      type: type as NotificationType
    }
  })
}
