import { prisma } from '@utils/prisma'

interface Params {
  postId?: string
}

export const purgeTopics = async ({ postId }: Params) => {
  return await prisma.postTopic.deleteMany({
    where: { postId }
  })
}
