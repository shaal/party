import { getMentions } from '@graphql/utils/getMentions'
import { getTopics } from '@graphql/utils/getTopics'
import { parseTopics } from '@graphql/utils/parseTopics'
import { Session } from '@prisma/client'
import { db } from '@utils/prisma'
import { CreatePostInput } from 'src/__generated__/schema.generated'

import { processMentions } from '../processMentions'

/**
 * Creates a new task
 * @param query - Contains an include object to pre-load data needed to resolve nested parts.
 * @param input - CreatePostInput
 * @param session - Current user's session
 * @returns a new task
 */
export const task = async (
  query: any,
  input: CreatePostInput,
  session: Session | null | undefined
) => {
  const task = await db.post.create({
    ...query,
    data: {
      userId: session!.userId,
      body: input.body,
      done: input.done,
      attachments: input.attachments ? input.attachments : undefined,
      type: 'TASK',
      productId: input.productId ? input.productId : null,
      topics: { create: parseTopics(getTopics(input.body)) }
    }
  })

  if (getMentions(task.body)?.length > 0) {
    await processMentions(task, session)
  }

  return task
}
