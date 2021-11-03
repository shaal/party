import { db } from '@utils/prisma'

/**
 * Generated a feed for explore page
 * @param query - Contains an include object to pre-load data needed to resolve nested parts.
 * @returns a posts for explore page
 */
export const exploreFeed = async (query: Record<string, unknown>) => {
  return await db.post.findMany({
    ...query,
    where: { user: { spammy: false }, hidden: false },
    orderBy: [
      { likes: { _count: 'desc' } },
      { replies: { _count: 'desc' } },
      { topics: { _count: 'desc' } },
      { user: { updatedAt: 'desc' } }
    ]
  })
}
