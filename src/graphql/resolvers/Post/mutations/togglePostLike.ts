import { hasLiked } from '@graphql/resolvers/Like/queries/hasLiked'
import { createNotification } from '@graphql/resolvers/Notification/mutations/createNotification'
import { prisma } from '@utils/prisma'

export const togglePostLike = async (
  query: any,
  userId: string,
  postId: string
) => {
  let like
  if (await hasLiked(userId, postId)) {
    await prisma.like.deleteMany({
      where: { userId, postId }
    })
  } else {
    like = await prisma.like.create({
      data: {
        post: { connect: { id: postId } },
        user: { connect: { id: userId } }
      }
    })
  }

  const post = await prisma.post.findFirst({
    ...query,
    where: { id: postId }
  })

  if (like && userId !== post?.userId) {
    await createNotification(userId, post?.userId, like?.id, 'POSTLIKE')
  }

  return post
}
