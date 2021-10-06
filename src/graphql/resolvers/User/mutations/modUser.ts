import { db } from '@utils/prisma'
import { ModUserInput } from 'src/__generated__/schema.generated'

export const modUser = async (query: any, input: ModUserInput) => {
  if (input.spammy) {
    await db.session.deleteMany({
      ...query,
      where: { userId: input.userId }
    })
  }

  return await db.user.update({
    ...query,
    where: { id: input.userId },
    data: {
      isVerified: input.isVerified as boolean,
      isStaff: input.isStaff as boolean,
      spammy: input.spammy as boolean,
      featuredAt: input.featuredAt ? new Date() : null
    }
  })
}
