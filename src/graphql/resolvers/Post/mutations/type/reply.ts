import { createNotification } from '@graphql/resolvers/Notification/mutations/createNotification'
import { CreatePostInput } from '@graphql/types.generated'
import { getMentions } from '@graphql/utils/getMentions'
import { getTopics } from '@graphql/utils/getTopics'
import { parseAttachments } from '@graphql/utils/parseAttachments'
import { parseTopics } from '@graphql/utils/parseTopics'
import { PostType, Session } from '@prisma/client'
import { db } from '@utils/prisma'

import { processMentions } from '../processMentions'

/**
 * Creates a new reply
 * @param query - Contains an include object to pre-load data needed to resolve nested parts.
 * @param input - CreatePostInput
 * @param session - Current user's session
 * @param parentId - Parent Post ID
 * @returns a new reply
 */
export const reply = async (
  query: Record<string, unknown>,
  input: CreatePostInput,
  session: Session | null | undefined,
  parentId: string | null | undefined
) => {
  const attachments = parseAttachments(input.attachments)
  const reply = await db.post.create({
    ...query,
    data: {
      userId: session!.userId,
      title: input.title,
      body: input.body,
      done: input.done,
      attachments: attachments
        ? { createMany: { data: attachments } }
        : undefined,
      type: input.type as PostType,
      topics: { create: parseTopics(getTopics(input.body)) },
      parentId
    }
  })

  const parent = await db.post.findUnique({
    where: { id: reply?.parentId! }
  })

  if (getMentions(reply.body)?.length > 0) {
    await processMentions(reply, session)
  }

  if (session!.userId !== parent?.userId) {
    createNotification(
      session!.userId,
      parent?.userId as string,
      reply?.id,
      'POST_REPLY'
    )
  }

  return reply
}
