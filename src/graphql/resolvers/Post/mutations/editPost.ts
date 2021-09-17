import { Session } from '@prisma/client'
import { prisma } from '@utils/prisma'
import { EditPostInput } from 'src/__generated__/schema.generated'

export const editPost = async (
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

  return await prisma.post.update({
    where: { id: post?.id },
    data: { body: input?.body as string, done: input?.done as boolean }
  })
}
