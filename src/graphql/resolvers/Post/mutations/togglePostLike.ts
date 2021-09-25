import { hasLiked } from '@graphql/resolvers/Like/queries/hasLiked'
import { createNotification } from '@graphql/resolvers/Notification/mutations/createNotification'
import { db } from '@utils/prisma'

export const togglePostLike = async (
  query: any,
  userId: string,
  postId: string
) => {
  try {
    let like
    if (await hasLiked(userId, postId)) {
      await db.like.deleteMany({
        where: { userId, postId }
      })
    } else {
      like = await db.like.create({
        data: {
          post: { connect: { id: postId } },
          user: { connect: { id: userId } }
        }
      })
    }

    const post = await db.post.findFirst({
      ...query,
      where: { id: postId }
    })

    if (like && userId !== post?.userId) {
      await createNotification(userId, post?.userId, like?.id, 'POST_LIKE')
    }

    return post
  } catch (error: any) {
    throw new Error(
      process.env.NODE_ENV === 'production' ? 'Something went wrong!' : error
    )
  }
}
