import { ModUserInput } from '@graphql/types.generated'
import { db } from '@utils/prisma'

/**
 * Moderate the user
 * @param query - Contains an include object to pre-load data needed to resolve nested parts.
 * @param input - ModUserInput
 * @returns the moderated user
 */
export const modUser = async (
  query: Record<string, unknown>,
  input: ModUserInput
) => {
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
