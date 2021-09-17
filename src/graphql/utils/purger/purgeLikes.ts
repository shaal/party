import { db } from '@utils/prisma'

interface Params {
  postId?: string
  userId?: string
}

export const purgeLikes = async ({ postId, userId }: Params) => {
  return await db.like.deleteMany({
    where: { postId, userId }
  })
}
