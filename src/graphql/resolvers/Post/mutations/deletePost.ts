import { Session } from '@prisma/client'

import { EditPostInput } from '~/__generated__/schema.generated'
import { prisma } from '~/utils/prisma'

export const deletePost = async (
  query: any,
  input: EditPostInput | null | undefined,
  session: Session | null | undefined
) => {
  const post = await prisma.post.findFirst({
    ...query,
    where: {
      id: input?.id,
      userId: session!.userId
    },

    rejectOnNotFound: true
  })

  return await prisma.post.delete({
    where: { id: post?.id }
  })
}
