import { db } from '@utils/prisma'

import { hasStarred } from '../queries/hasStarred'

export const toggleStar = async (currentUserId: string, topicId: string) => {
  // Unstar
  if (await hasStarred(currentUserId, topicId)) {
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
