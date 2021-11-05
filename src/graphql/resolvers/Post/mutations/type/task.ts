import { CreatePostInput } from '@graphql/types.generated'
import { getMentions } from '@graphql/utils/getMentions'
import { getTopics } from '@graphql/utils/getTopics'
import { parseAttachments } from '@graphql/utils/parseAttachments'
import { parseTopics } from '@graphql/utils/parseTopics'
import { Session } from '@prisma/client'
import { db } from '@utils/prisma'

import { processMentions } from '../processMentions'

/**
 * Creates a new task
 * @param query - Contains an include object to pre-load data needed to resolve nested parts.
 * @param input - CreatePostInput
 * @param session - Current user's session
 * @returns a new task
 */
export const task = async (
  query: Record<string, unknown>,
  input: CreatePostInput,
  session: Session | null | undefined
) => {
  const attachments = parseAttachments(input.attachments)
  const task = await db.post.create({
    ...query,
    data: {
      userId: session!.userId,
      body: input.body,
      done: input.done,
      attachments: attachments
        ? { createMany: { data: attachments } }
        : undefined,
      type: 'TASK',
      productId:
        input.targetId && input.targetType === 'Product'
          ? input.targetId
          : null,
      communityId:
        input.targetId && input.targetType === 'Community'
          ? input.targetId
          : null,
      topics: { create: parseTopics(getTopics(input.body)) }
    }
  })

  if (getMentions(task.body)?.length > 0) {
    await processMentions(task, session)
  }

  return task
}
