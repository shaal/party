import { db } from '@utils/prisma'

/**
 * Get featured topics
 * @param query - Contains an include object to pre-load data needed to resolve nested parts.
 * @returns list of featured topics
 */
export const getFeaturedTopics = async (query: Record<string, unknown>) => {
  return await db.topic.findMany({
    ...query,
    where: { featuredAt: { not: null } },
    orderBy: { featuredAt: 'desc' }
  })
}
