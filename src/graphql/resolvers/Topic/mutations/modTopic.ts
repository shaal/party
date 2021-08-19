import { Session } from '@prisma/client'

import { EditTopicInput } from '../../../../__generated__/schema.generated'
import { db } from '../../../../utils/prisma'

export const modTopic = async (
  query: any,
  input: EditTopicInput | null | undefined,
  session: Session | null | undefined
) => {
  const actionUser = await db.user.findUnique({
    where: { id: session!.userId }
  })

  if (actionUser?.isStaff) {
    return await db.topic.update({
      where: { id: input?.id },
      data: {
        description: input?.description as string
      }
    })
  }

  return null
}
