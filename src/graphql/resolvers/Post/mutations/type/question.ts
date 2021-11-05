import { CreatePostInput } from '@graphql/types.generated'
import { getMentions } from '@graphql/utils/getMentions'
import { getTopics } from '@graphql/utils/getTopics'
import { parseAttachments } from '@graphql/utils/parseAttachments'
import { parseTopics } from '@graphql/utils/parseTopics'
import { Session } from '@prisma/client'
import { db } from '@utils/prisma'

import { processMentions } from '../processMentions'

/**
 * Creates a new question
 * @param query - Contains an include object to pre-load data needed to resolve nested parts.
 * @param input - CreatePostInput
 * @param session - Current user's session
 * @returns a new question
 */
export const question = async (
  query: Record<string, unknown>,
  input: CreatePostInput,
  session: Session | null | undefined
) => {
  const attachments = parseAttachments(input.attachments)
  const question = await db.post.create({
    ...query,
    data: {
      userId: session!.userId,
      title: input.title,
      body: input.body,
      attachments: attachments
        ? { createMany: { data: attachments } }
        : undefined,
      type: 'QUESTION',
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

  if (getMentions(question.body)?.length > 0) {
    await processMentions(question, session)
  }

  return question
}
