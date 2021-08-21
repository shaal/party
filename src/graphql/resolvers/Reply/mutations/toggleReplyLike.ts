import { prisma } from '~/utils/prisma'

import { hasLiked } from '../../Common/hasLiked'

export const toggleReplyLike = async (
  query: any,
  userId: string,
  replyId: string
) => {
  if (await hasLiked(userId, null, replyId)) {
    await prisma.like.deleteMany({
      where: { userId, replyId }
    })
  } else {
    await prisma.like.create({
      data: {
        reply: { connect: { id: replyId } },
        user: { connect: { id: userId } }
      }
    })
  }

  return await prisma.reply.findUnique({
    ...query,
    where: { id: replyId }
  })
}
