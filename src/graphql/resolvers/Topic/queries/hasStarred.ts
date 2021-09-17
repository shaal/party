import { db } from '@utils/prisma'

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
