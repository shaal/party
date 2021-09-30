import { getMentions } from '@graphql/utils/getMentions'
import { Session } from '@prisma/client'
import { db } from '@utils/prisma'
import { CreatePostInput } from 'src/__generated__/schema.generated'

import { processMentions } from '../processMentions'

export const commit = async (
  query: any,
  input: CreatePostInput,
  session: Session | null | undefined
) => {
  const commit = await db.post.create({
    ...query,
    data: {
      userId: session!.userId,
      body: input.body,
      attachments: input.attachments ? input.attachments : undefined,
      type: 'COMMIT',
      productId: input.productId ? input.productId : null
    }
  })

  if (getMentions(commit.body)?.length > 0) {
    await processMentions(commit, session)
  }

  return commit
}
