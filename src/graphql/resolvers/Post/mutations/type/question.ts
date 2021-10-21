import { getMentions } from '@graphql/utils/getMentions'
import { getTopics } from '@graphql/utils/getTopics'
import { parseTopics } from '@graphql/utils/parseTopics'
import { Session } from '@prisma/client'
import { db } from '@utils/prisma'
import { CreatePostInput } from 'src/__generated__/schema.generated'

import { processMentions } from '../processMentions'

/**
 * Creates a new question
 * @param query - Contains an include object to pre-load data needed to resolve nested parts.
 * @param input - CreatePostInput
 * @param session - Current user's session
 * @returns a new question
 */
export const question = async (
  query: any,
  input: CreatePostInput,
  session: Session | null | undefined
) => {
  const question = await db.post.create({
    ...query,
    data: {
      userId: session!.userId,
      title: input.title,
      body: input.body,
      // TODO: work on this to new model
      attachments: input.attachments ? input.attachments : undefined,
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
