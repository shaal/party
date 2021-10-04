import { getMentions } from '@graphql/utils/getMentions'
import { getTopics } from '@graphql/utils/getTopics'
import { parseTopics } from '@graphql/utils/parseTopics'
import { Session } from '@prisma/client'
import { db } from '@utils/prisma'
import { CreatePostInput } from 'src/__generated__/schema.generated'

import { processMentions } from '../processMentions'

export const post = async (
  query: any,
  input: CreatePostInput,
  session: Session | null | undefined
) => {
  const post = await db.post.create({
    ...query,
    data: {
      userId: session!.userId,
      body: input.body,
      attachments: input.attachments ? input.attachments : undefined,
      type: 'POST',
      productId: input.productId ? input.productId : null,
      topics: { create: parseTopics(getTopics(input.body)) }
    }
  })

  if (getMentions(post.body)?.length > 0) {
    await processMentions(post, session)
  }

  return post
}
