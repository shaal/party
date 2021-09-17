import { prisma } from '@utils/prisma'

interface Params {
  parentId?: string
}

export const purgeReplies = async ({ parentId }: Params) => {
  return await prisma.post.deleteMany({
    where: { parentId }
  })
}
