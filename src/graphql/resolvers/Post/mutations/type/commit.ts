import { Session } from '@prisma/client'
import { db } from '@utils/prisma'
import { CreatePostInput } from 'src/__generated__/schema.generated'

export const commit = async (
  query: any,
  input: CreatePostInput,
  session: Session | null | undefined
) => {
  const commitURL = input?.body
  const splitedURL = new URL(commitURL).pathname.split('/')

  const response = await fetch(
    `https://api.github.com/repos/${splitedURL[1]}/${splitedURL[2]}/commits/${splitedURL[4]}`
  )

  if (!response.ok) {
    throw new Error('Something went wrong while fetching commit data!')
  }

  const commitData = await response.json()

  const commit = await db.post.create({
    ...query,
    data: {
      userId: session!.userId,
      body: commitData.commit.message,
      type: 'COMMIT',
      productId: input.productId ? input.productId : null
    }
  })

  return commit
}
