import { db } from '@utils/prisma'

/**
 * Get list of all users
 * @param query - Contains an include object to pre-load data needed to resolve nested parts.
 * @returns list of all users
 */
export const getUsers = async (query: Record<string, unknown>) => {
  return await db.user.findMany({
    ...query,
    where: { spammy: false },
    orderBy: { createdAt: 'desc' }
  })
}
