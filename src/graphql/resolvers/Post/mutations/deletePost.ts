import { Result } from '@graphql/resolvers/ResultResolver'
import { EditPostInput } from '@graphql/types.generated'
import { Session } from '@prisma/client'
import { db } from '@utils/prisma'

/**
 * Deletes a post
 * @param input - EditPostInput
 * @param session - Current user's session
 * @returns a Result (Success or Failed)
 */
export const deletePost = async (
  input: EditPostInput | null | undefined,
  session: Session | null | undefined
) => {
  const post = await db.post.findFirst({
    where: {
      id: input?.id,
      userId: session!.userId
    },

    rejectOnNotFound: true
  })

  await db.post.delete({ where: { id: post?.id } })

  return Result.SUCCESS
}
