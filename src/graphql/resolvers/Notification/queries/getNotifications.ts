import { Session } from '@prisma/client'

import { prisma } from '../../../../utils/prisma'

export const getNotifications = async (
  query: any,
  session: Session | null | undefined
) => {
  return await prisma.notification.findMany({
    ...query,
    where: {
      receiverId: session?.userId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}
