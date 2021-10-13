import { db } from '@utils/prisma'

/**
 * Check whether user starred a topic
 * @param currentUserId - Current user ID
 * @param topicId - Topic ID to be checked
 * @returns whether user starred a topic
 */
export const hasStarred = async (currentUserId: string, topicId: string) => {
  const user = await db.topic.findUnique({
    where: { id: topicId },
    include: {
      starrers: {
        where: {
          id: currentUserId
        }
      }
    }
  })

  return user?.starrers?.length === 0 ? false : true
}
