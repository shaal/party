import { db } from 'src/utils/prisma'

import { hasLiked } from './hasLiked'

export const toggleReplyLike = async (
  query: any,
  userId: string,
  replyId: string
) => {
  if (await hasLiked(userId, null, replyId)) {
    await db.like.deleteMany({
      where: { userId, replyId }
    })
  } else {
    await db.like.create({
      data: {
        reply: { connect: { id: replyId } },
        user: { connect: { id: userId } }
      }
    })
  }

  return await db.reply.findUnique({
    ...query,
    where: { id: replyId }
  })
}
