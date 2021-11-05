import { CreatePostInput } from '@graphql/types.generated'
import { Session } from '@prisma/client'
import { db } from '@utils/prisma'

/**
 * Creates a new issue
 * @param query - Contains an include object to pre-load data needed to resolve nested parts.
 * @param input - CreatePostInput
 * @param session - Current user's session
 * @returns a new issue
 */
export const issue = async (
  query: Record<string, unknown>,
  input: CreatePostInput,
  session: Session | null | undefined
) => {
  const url = new URL(input.body)
  const paths = url.pathname.split('/')
  if (
    url.host !== 'github.com' ||
    paths[3] !== 'issues' ||
    paths.length !== 5
  ) {
    throw new Error('Invalid issue URL')
  }

  const issue = await db.post.create({
    ...query,
    data: {
      userId: session!.userId,
      body: input.body,
      type: 'ISSUE',
      productId:
        input.targetId && input.targetType === 'Product'
          ? input.targetId
          : null,
      communityId:
        input.targetId && input.targetType === 'Community'
          ? input.targetId
          : null
    }
  })

  return issue
}
