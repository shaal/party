import { getMentions } from '@graphql/utils/getMentions'
import { getTopics } from '@graphql/utils/getTopics'
import { parseTopics } from '@graphql/utils/parseTopics'
import { PostType, Session } from '@prisma/client'
import { db } from '@utils/prisma'
import { CreatePostInput } from 'src/__generated__/schema.generated'

import { processMentions } from './processMentions'

export const createPost = async (
  query: any,
  input: CreatePostInput,
  session: Session | null | undefined
) => {
  if (getTopics(input.body)?.length > 5) {
    throw new Error('Oops! Your post should not contain more than 5 topics')
  }

  if (getMentions(input.body)?.length > 5) {
    throw new Error('Oops! Your post should not contain more than 5 mentions')
  }

  if (input.parentId && input.type !== 'REPLY') {
    throw new Error('Invalid type')
  }

  if (input.productId) {
    const product = await db.product.findUnique({
      ...query,
      where: { id: input.productId }
    })

    if (product?.userId !== session!.userId) {
      throw new Error(
        'Oops! Sorry you cannot post in product that is not owned'
      )
    }
  }

  let parentId = null

  if (input.parentId) {
    const parent = await db.post.findUnique({
      ...query,
      where: { id: input.parentId }
    })
    if (parent) {
      parentId = parent?.id
    } else {
      throw new Error('Incorrect parent ID')
    }
  }

  const post = await db.post.create({
    ...query,
    data: {
      userId: session!.userId,
      title: input.title,
      body: input.body,
      done: input.done,
      attachments: input.attachments ? input.attachments : undefined,
      type: input.type as PostType,
      productId: input.productId ? input.productId : null,
      topics: {
        create: parseTopics(getTopics(input.body))
      },
      parentId
    }
  })

  if (getMentions(input.body)?.length > 0) {
    await processMentions(post, session)
  }

  return post
}
