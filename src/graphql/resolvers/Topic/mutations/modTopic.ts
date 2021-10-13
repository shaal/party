import { Session } from '@prisma/client'
import { db } from '@utils/prisma'
import { EditTopicInput } from 'src/__generated__/schema.generated'

/**
 * Update the topic
 * @param query - Contains an include object to pre-load data needed to resolve nested parts.
 * @param input - EditTopicInput
 * @param session - Current user's session
 * @returns the updated topic
 */
export const modTopic = async (
  query: any,
  input: EditTopicInput | null | undefined,
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
        description: input?.description as string
      }
    })
  }

  return null
}
