import { prisma } from '@utils/prisma'

interface Params {
  postId?: string
  userId?: string
}

export const purgeLikes = async ({ postId, userId }: Params) => {
  return await prisma.like.deleteMany({
    where: { postId, userId }
  })
}
