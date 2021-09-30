import { getMentions } from '@graphql/utils/getMentions'
import { getTopics } from '@graphql/utils/getTopics'
import { parseTopics } from '@graphql/utils/parseTopics'
import { Session } from '@prisma/client'
import { db } from '@utils/prisma'
import { CreatePostInput } from 'src/__generated__/schema.generated'

import { processMentions } from '../processMentions'

export const commit = async (
  query: any,
  input: CreatePostInput,
  session: Session | null | undefined,
  parentId: string | null | undefined
) => {
  const commit = await db.post.create({
    ...query,
    data: {
      userId: session!.userId,
      body: input.body,
      done: input.done,
      attachments: input.attachments ? input.attachments : undefined,
      type: 'COMMIT',
      productId: input.productId ? input.productId : null,
      topics: {
        create: parseTopics(getTopics(input.body))
      },
      parentId
    }
  })

  if (getMentions(commit.body)?.length > 0) {
    await processMentions(commit, session)
  }

  return commit
}
