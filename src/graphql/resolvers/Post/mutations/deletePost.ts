import { Result } from '@graphql/resolvers/ResultResolver'
import { purgeLikes } from '@graphql/utils/purger/purgeLikes'
import { purgeReplies } from '@graphql/utils/purger/purgeReplies'
import { purgeTopics } from '@graphql/utils/purger/purgeTopics'
import { Session } from '@prisma/client'
import { db } from '@utils/prisma'
import { EditPostInput } from 'src/__generated__/schema.generated'

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

  // Purge all related data to the post
  await purgeLikes({ postId: post?.id })
  await purgeReplies({ parentId: post?.id })
  await purgeTopics({ postId: post?.id })
  await db.post.delete({
    where: { id: post?.id }
  })

  return Result.SUCCESS
}
