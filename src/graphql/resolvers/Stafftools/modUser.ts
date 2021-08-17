import { ModUserInput } from '../../../__generated__/schema.generated'
import { db } from '../../../utils/prisma'

export const modUser = async (input: ModUserInput, session: any) => {
  const actionUser = await db.user.findUnique({
    where: { id: session!.userId }
  })

  if (actionUser?.isStaff) {
    return await db.user.update({
      where: { id: input.userId },
      data: {
        isVerified: input.isVerified as boolean
      }
    })
  }

  return null
}
