import { db } from '~/utils/prisma'

export const purgeLikes = async (postId: string) => {
  return await db.like.deleteMany({
    where: {
      postId
    }
  })
}
