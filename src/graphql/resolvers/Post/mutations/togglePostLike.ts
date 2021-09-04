import { db } from '~/utils/prisma'

import { hasLiked } from '../../Common/hasLiked'

export const togglePostLike = async (
  query: any,
  userId: string,
  postId: string
) => {
  if (await hasLiked(userId, postId)) {
    await db.like.deleteMany({
      where: { userId, postId }
    })
  } else {
    await db.like.create({
      data: {
        post: { connect: { id: postId } },
        user: { connect: { id: userId } },
        notification: {
          create: {
            dispatcher: { connect: { id: userId } },
            receiver: { connect: { id: userId } },
            type: 'POSTLIKE'
          }
        }
      }
    })
  }

  const post = await db.post.findUnique({
    ...query,
    where: { id: postId }
  })

  return post
}
