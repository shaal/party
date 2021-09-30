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
      body: commitData?.commit?.message?.split('\n')[0],
      type: 'COMMIT',
      productId: input.productId ? input.productId : null,
      commit: {
        create: {
          repoSlug: `${splitedURL[1]}/${splitedURL[2]}`,
          message: commitData?.commit?.message?.split('\n')[0],
          url: commitData?.html_url,
          verified: commitData?.commit?.verification?.verified,
          changed: commitData?.files.length,
          additions: commitData?.stats?.additions,
          deletions: commitData?.stats?.deletions,
          authorUsername: commitData?.author?.login,
          authorAvatar: commitData?.author?.avatar_url
        }
      }
    }
  })

  return commit
}
