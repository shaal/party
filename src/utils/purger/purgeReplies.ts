import { db } from '~/utils/prisma'

interface Params {
  parentId?: string
}

export const purgeReplies = async ({ parentId }: Params) => {
  return await db.post.deleteMany({
    where: { parentId }
  })
}
