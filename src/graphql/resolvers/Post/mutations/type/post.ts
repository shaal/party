import { CreatePostInput } from '@graphql/types.generated'
import { getMentions } from '@graphql/utils/getMentions'
import { getTopics } from '@graphql/utils/getTopics'
import { parseAttachments } from '@graphql/utils/parseAttachments'
import { parseTopics } from '@graphql/utils/parseTopics'
import { Session } from '@prisma/client'
import { db } from '@utils/prisma'

import { processMentions } from '../processMentions'

/**
 * Creates a new post
 * @param query - Contains an include object to pre-load data needed to resolve nested parts.
 * @param input - CreatePostInput
 * @param session - Current user's session
 * @returns a new post
 */
export const post = async (
  query: Record<string, unknown>,
  input: CreatePostInput,
  session: Session | null | undefined
) => {
  const attachments = parseAttachments(input.attachments)
  const post = await db.post.create({
    ...query,
    data: {
      userId: session!.userId,
      body: input.body,
      attachments: attachments
        ? { createMany: { data: attachments } }
        : undefined,
      type: 'POST',
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

  if (getMentions(post.body)?.length > 0) {
    await processMentions(post, session)
  }

  return post
}
