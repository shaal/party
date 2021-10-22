import { db } from '@utils/prisma'

/**
 * Checks whether user has bookmarked the post
 * @param currentUserId - Current user ID
 * @param postId - Post ID to check it is bookmarked
 * @returns whether user has bookmarked the post
 */
export const hasBookmarked = async (currentUserId: string, postId: string) => {
  const bookmark = await db.bookmark.count({
    where: { postId: postId, userId: currentUserId }
  })

  return bookmark === 0 ? false : true
}
