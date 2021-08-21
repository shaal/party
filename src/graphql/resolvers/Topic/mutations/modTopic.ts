import { Session } from '@prisma/client'
import { prisma } from '@utils/prisma'

import { EditTopicInput } from '../../../../__generated__/schema.generated'

export const modTopic = async (
  query: any,
  input: EditTopicInput | null | undefined,
  session: Session | null | undefined
) => {
  const actionUser = await prisma.user.findUnique({
    where: { id: session!.userId }
  })

  if (actionUser?.isStaff) {
    return await prisma.topic.update({
      where: { id: input?.id },
      data: {
        description: input?.description as string
      }
    })
  }

  return null
}
