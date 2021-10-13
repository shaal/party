import { db } from '@utils/prisma'
import { ERROR_MESSAGE, IS_PRODUCTION } from 'src/constants'

import { hasStarred } from '../queries/hasStarred'

/**
 * Star a topic
 * @param currentUserId - Current user ID
 * @param topicId - Topic ID to be starred
 * @returns the starred topic
 */
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
  } catch (error: any) {
    throw new Error(IS_PRODUCTION ? ERROR_MESSAGE : error)
  }
}
