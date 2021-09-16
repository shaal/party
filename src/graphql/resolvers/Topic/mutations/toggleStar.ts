import { db } from '@utils/prisma'

import { hasStarred } from '../queries/hasStarred'

export const toggleStar = async (currentUserId: string, topicId: string) => {
  // Unstar
  if (await hasStarred(currentUserId, topicId)) {
    return await db.topic.update({
      where: { id: topicId },
      data: {
        starrers: {
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
      starrers: {
        connect: {
          id: currentUserId
        }
      }
    }
  })

  return topic
}
