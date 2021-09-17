import { db } from '@utils/prisma'

interface Params {
  postId?: string
}

export const purgeTopics = async ({ postId }: Params) => {
  return await db.postTopic.deleteMany({
    where: { postId }
  })
}
