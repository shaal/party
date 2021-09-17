import { NotificationType } from '@prisma/client'
import { db } from '@utils/prisma'
import { sendEmail } from '@utils/sendEmail'

export const createNotification = async (
  dispatcherId: any,
  receiverId: any,
  entityId: any,
  type: NotificationType
) => {
  const notification = await db.notification.create({
    data: {
      dispatcher: { connect: { id: dispatcherId } },
      receiver: { connect: { id: receiverId } },
      like: type === 'POSTLIKE' ? { connect: { id: entityId } } : undefined,
      type
    }
  })

  await sendEmail({
    receiverId: notification?.receiverId,
    subject: 'Someone liked your post',
    text: 'Someone liked your post'
  })

  return
}
