import { Prisma } from '@prisma/client'
import { db } from '@utils/prisma'
import { ERROR_MESSAGE, IS_PRODUCTION } from 'src/constants'

import { hasBookmarked } from '../queries/hasBookmarked'

/**
 * Bookmark a post
 * @param currentUserId - Current user ID
 * @param postId - Post ID need to be bookmarked
 * @returns the bookmarked post
 */
export const toggleBookmark = async (currentUserId: string, postId: string) => {
  try {
    const post = await db.post.findUnique({ where: { id: postId } })

    // Remove Bookmark
    if (await hasBookmarked(currentUserId, postId)) {
      const bookmark = await db.bookmark.findFirst({ where: { postId } })

      await db.bookmark.delete({
        where: { id: bookmark?.id }
      })

      return post
    }

    // Bookmark
    await db.bookmark.create({
      data: {
        user: { connect: { id: currentUserId } },
        post: { connect: { id: postId } }
      }
    })

    return post
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(IS_PRODUCTION ? ERROR_MESSAGE : error.message)
    }
  }
}
