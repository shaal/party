import { db } from '@utils/prisma'

export const hasStarted = async (currentUserId: string, topicId: string) => {
  const user = await db.topic.findUnique({
    where: { id: topicId },
    include: {
      users: {
        where: {
          id: currentUserId
        }
      }
    }
  })

  return user?.users?.length === 0 ? false : true
}
