import { Session } from '@prisma/client'

import { EditPostInput } from '~/__generated__/schema.generated'
import { db } from '~/utils/prisma'
import { purgeLikes } from '~/utils/purger/purgeLikes'

export const deletePost = async (
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

  await purgeLikes({ postId: post?.id })

  return await db.post.delete({
    where: { id: post?.id }
  })
}
