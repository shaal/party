import { db } from '../prisma'

interface Params {
  postId?: string
}

export const purgeTopics = async ({ postId }: Params) => {
  return await db.postTopic.deleteMany({
    where: { postId }
  })
}
