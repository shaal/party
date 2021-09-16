import { db } from '@utils/prisma'

import { hasStarted } from '../queries/hasStarted'

export const toggleStar = async (currentUserId: string, topicId: string) => {
  // Unstar
  if (await hasStarted(currentUserId, topicId)) {
    return await db.topic.update({
      where: { id: topicId },
      data: {
        users: {
          disconnect: {
            id: currentUserId
          }
        }
      }
    })
  }

  // Star
  const topic = await db.topic.update({
    where: { id: topicId },
    data: {
      users: {
        connect: {
          id: currentUserId
        }
      }
    }
  })

  return topic
}
