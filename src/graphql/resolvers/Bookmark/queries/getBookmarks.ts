import { db } from '@utils/prisma'

/**
 * Get all bookmarks
 * @param query - Contains an include object to pre-load data needed to resolve nested parts.
 * @returns list of all bookmarks
 */
export const getBookmarks = async (query: any) => {
  return await db.bookmark.findMany({
    ...query,
    orderBy: { createdAt: 'desc' }
  })
}
