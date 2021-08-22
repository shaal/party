import { PostType, Session } from '@prisma/client'

import { CreatePostInput } from '~/__generated__/schema.generated'
import { getTopics } from '~/graphql/utils/getTopics'
import { parseTopics } from '~/graphql/utils/parseTopics'
import { prisma } from '~/utils/prisma'

export const createPost = async (
  query: any,
  input: CreatePostInput,
  session: Session | null | undefined
) => {
  if (getTopics(input.body)?.length > 5) {
    throw new Error('Your post should not contain more than 5 topics')
  }

  if (input.productId) {
    const product = await prisma.product.findUnique({
      where: { id: input.productId }
    })

    if (product?.userId !== session!.userId) {
      throw new Error('You cannot post in other user products')
    }
  }

  let parentId = null

  if (input.parentId) {
    const parent = await prisma.post.findUnique({
      where: { id: input.parentId }
    })
    if (parent) {
      parentId = parent?.id
    } else {
      throw new Error('Incorrect parent ID')
    }
  }

  return await prisma.post.create({
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
      },
      parentId
    }
  })
}
