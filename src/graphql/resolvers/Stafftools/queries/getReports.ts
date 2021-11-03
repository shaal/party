import { db } from '@utils/prisma'

/**
 * Get all reports reported by the users
 * @param query - Contains an include object to pre-load data needed to resolve nested parts.
 * @returns all the reports reported by the users
 */
export const getReports = async (query: Record<string, unknown>) => {
  return await db.report.findMany({
    ...query,
    orderBy: { createdAt: 'desc' }
  })
}
