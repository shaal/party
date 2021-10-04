import { getMentions } from '@graphql/utils/getMentions'
import { getTopics } from '@graphql/utils/getTopics'
import { parseTopics } from '@graphql/utils/parseTopics'
import { Session } from '@prisma/client'
import { db } from '@utils/prisma'
import { CreatePostInput } from 'src/__generated__/schema.generated'

import { processMentions } from '../processMentions'

export const poll = async (
  query: any,
  input: CreatePostInput,
  session: Session | null | undefined
) => {
  const poll = await db.post.create({
    ...query,
    data: {
      userId: session!.userId,
      body: input.body,
      type: 'POLL',
      productId: input.productId ? input.productId : null,
      topics: {
        create: parseTopics(getTopics(input.body))
      },
      poll: {
        create: {
          answers: {
            createMany: { data: input.polls }
          }
        }
      }
    }
  })

  if (getMentions(poll.body)?.length > 0) {
    await processMentions(poll, session)
  }

  return poll
}
