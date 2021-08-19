import { Session } from '@prisma/client'

import { ModUserInput } from '../../../../__generated__/schema.generated'
import { db } from '../../../../utils/prisma'

export const modUser = async (
  input: ModUserInput,
  session: Session | null | undefined
) => {
  const actionUser = await db.user.findUnique({
    where: { id: session!.userId }
  })

  if (actionUser?.isStaff) {
    if (input.spammy) {
      await db.session.deleteMany({ where: { userId: input.userId } })
    }

    return await db.user.update({
      where: { id: input.userId },
      data: {
        isVerified: input.isVerified as boolean,
        isStaff: input.isStaff as boolean,
        spammy: input.spammy as boolean
      }
    })
  }

  return null
}
