import { createNotification } from '@graphql/resolvers/Notification/mutations/createNotification'
import { getMentions } from '@graphql/utils/getMentions'
import { getTopics } from '@graphql/utils/getTopics'
import { parseTopics } from '@graphql/utils/parseTopics'
import { PostType, Session } from '@prisma/client'
import { db } from '@utils/prisma'
import { CreatePostInput } from 'src/__generated__/schema.generated'

import { processMentions } from '../processMentions'

export const reply = async (
  query: any,
  input: CreatePostInput,
  session: Session | null | undefined,
  parentId: string | null | undefined
) => {
  const reply = await db.post.create({
    ...query,
    data: {
      userId: session!.userId,
      title: input.title,
      body: input.body,
      done: input.done,
      attachments: input.attachments ? input.attachments : undefined,
      type: input.type as PostType,
      productId: input.productId ? input.productId : null,
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
    createNotification(session!.userId, parent?.userId, reply?.id, 'POST_REPLY')
  }

  return reply
}
