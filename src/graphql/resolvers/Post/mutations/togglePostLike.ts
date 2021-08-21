import { prisma } from '@utils/prisma'

import { createNotification } from '../../Common/createNotification'
import { hasLiked } from '../../Common/hasLiked'

export const togglePostLike = async (
  query: any,
  userId: string,
  postId: string
) => {
  if (await hasLiked(userId, postId, null)) {
    await prisma.like.deleteMany({
      where: { userId, postId }
    })
  } else {
    await prisma.like.create({
      data: {
        post: { connect: { id: postId } },
        user: { connect: { id: userId } }
      }
    })
  }

  const post = await prisma.post.findUnique({
    ...query,
    where: { id: postId }
  })

  await createNotification(
    post?.userId as string,
    userId,
    post?.id as string,
    'POSTLIKE'
  )

  return post
}
