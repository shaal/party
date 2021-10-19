import { Session } from '@prisma/client'
import { db } from '@utils/prisma'
import { CreateReportInput } from 'src/__generated__/schema.generated'

/**
 * Creates a new report
 * @param query - Contains an include object to pre-load data needed to resolve nested parts.
 * @param input - CreateReportInput
 * @param session - Current user's session
 * @returns the new report
 */
export const createReport = async (
  query: any,
  input: CreateReportInput,
  session: Session | null | undefined
) => {
  return await db.report.create({
    ...query,
    data: {
      type: input?.type,
      message: input?.message,
      user: { connect: { id: session?.userId } }
    }
  })
}
