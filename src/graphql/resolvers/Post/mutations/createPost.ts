import { getMentions } from '@graphql/utils/getMentions'
import { getTopics } from '@graphql/utils/getTopics'
import { Session } from '@prisma/client'
import { db } from '@utils/prisma'
import { CreatePostInput } from 'src/__generated__/schema.generated'

import { post } from './type/post'
import { question } from './type/question'
import { reply } from './type/reply'
import { task } from './type/task'

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

    if (product?.ownerId !== session!.userId) {
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

  let newPost: any

  if (input?.type === 'POST') {
    newPost = await post(query, input, session, parentId)
  }

  if (input?.type === 'TASK') {
    newPost = await task(query, input, session, parentId)
  }

  if (input?.type === 'QUESTION') {
    newPost = await question(query, input, session, parentId)
  }

  if (input?.type === 'REPLY') {
    newPost = await reply(query, input, session, parentId)
  }

  return newPost
}
