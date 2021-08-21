import { Session } from '@prisma/client'

import { CreateReplyInput } from '~/__generated__/schema.generated'
import { prisma } from '~/utils/prisma'

export const createReply = async (
  query: any,
  input: CreateReplyInput,
  session: Session | null | undefined
) => {
  return await prisma.reply.create({
    ...query,
    data: {
      userId: session!.userId,
      postId: input.postId,
      body: input.body
    }
  })
}
