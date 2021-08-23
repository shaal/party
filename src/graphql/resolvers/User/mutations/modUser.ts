import { Session } from '@prisma/client'

import { ModUserInput } from '~/__generated__/schema.generated'
import { db } from '~/utils/prisma'

export const modUser = async (
  query: any,
  input: ModUserInput,
  session: Session | null | undefined
) => {
  const actionUser = await db.user.findUnique({
    ...query,
    where: { id: session!.userId }
  })

  if (actionUser?.isStaff) {
    if (input.spammy) {
      await db.session.deleteMany({ ...query, where: { userId: input.userId } })
    }

    return await db.user.update({
      ...query,
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
