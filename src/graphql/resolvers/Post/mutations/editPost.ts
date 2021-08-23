import { Session } from '@prisma/client'

import { EditPostInput } from '~/__generated__/schema.generated'
import { db } from '~/utils/prisma'

export const editPost = async (
  query: any,
  input: EditPostInput | null | undefined,
  session: Session | null | undefined
) => {
  const post = await db.post.findFirst({
    ...query,
    where: {
      id: input?.id,
      userId: session!.userId
    },

    rejectOnNotFound: true
  })

  return await db.post.update({
    where: { id: post?.id },
    data: { body: input?.body as string, done: input?.done as boolean }
  })
}
