import { hasLiked } from '@graphql/resolvers/Like/queries/hasLiked'
import { createNotification } from '@graphql/resolvers/Notification/mutations/createNotification'
import { db } from '@utils/prisma'
import { ERROR_MESSAGE, IS_PRODUCTION } from 'src/constants'

/**
 * Like a post
 * @param query - Contains an include object to pre-load data needed to resolve nested parts.
 * @param userId  - Current user ID
 * @param postId - Post ID need to be liked
 * @returns a liked post
 */
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
      createNotification(userId, post?.userId, like?.id, 'POST_LIKE')
    }

    return post
  } catch (error: any) {
    throw new Error(IS_PRODUCTION ? ERROR_MESSAGE : error)
  }
}
