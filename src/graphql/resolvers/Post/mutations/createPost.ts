import { PostType, Session } from '@prisma/client'

import { CreatePostInput } from '../../../../__generated__/schema.generated'
import { db } from '../../../../utils/prisma'
import { getTopics } from '../../../utils/getTopics'
import { parseTopics } from '../../../utils/parseTopics'

export const createPost = async (
  query: any,
  input: CreatePostInput,
  session: Session | null | undefined
) => {
  if (getTopics(input.body)?.length > 5) {
    throw new Error('Your post should not contain more than 5 topics')
  }
  return await db.post.create({
    ...query,
    data: {
      userId: session!.userId,
      title: input.title,
      body: input.body,
      done: input.done,
      attachments: input.attachments,
      type: input.type as PostType,
      productId: input.productId ? input.productId : null,
      topics: {
        create: parseTopics(getTopics(input.body))
      }
    }
  })
}