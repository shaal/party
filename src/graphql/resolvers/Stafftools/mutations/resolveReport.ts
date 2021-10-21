import { Result } from '@graphql/resolvers/ResultResolver'
import { db } from '@utils/prisma'
import { ERROR_MESSAGE, IS_PRODUCTION } from 'src/constants'

/**
 * Resolve a report
 * @param reportId - Report ID to be resolved
 * @returns the result
 */
export const resolveReport = async (reportId: string) => {
  try {
    await db.report.delete({ where: { id: reportId } })

    return Result.SUCCESS
  } catch (error: any) {
    throw new Error(IS_PRODUCTION ? ERROR_MESSAGE : error)
  }
}
