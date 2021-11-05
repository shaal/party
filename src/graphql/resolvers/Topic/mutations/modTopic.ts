import { ModTopicInput } from '@graphql/types.generated'
import { Session } from '@prisma/client'
import { db } from '@utils/prisma'

/**
 * Update the topic
 * @param query - Contains an include object to pre-load data needed to resolve nested parts.
 * @param input - ModTopicInput
 * @param session - Current user's session
 * @returns the updated topic
 */
export const modTopic = async (
  query: Record<string, unknown>,
  input: ModTopicInput | null | undefined,
  session: Session | null | undefined
) => {
  const actionUser = await db.user.findUnique({
    ...query,
    where: { id: session!.userId }
  })

  if (actionUser?.isStaff) {
    return await db.topic.update({
      ...query,
      where: { id: input?.id },
      data: {
        description: input?.description as string,
        featuredAt: input?.featuredAt ? new Date() : null
      }
    })
  }

  return null
}
