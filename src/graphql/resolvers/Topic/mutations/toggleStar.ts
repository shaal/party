import { db } from '@utils/prisma'

import { hasStarred } from '../queries/hasStarred'

export const toggleStar = async (currentUserId: string, topicId: string) => {
  try {
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
  } catch (error) {
    throw new Error('Something went wrong!')
  }
}
