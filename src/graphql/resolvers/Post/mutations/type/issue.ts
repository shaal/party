import { Session } from '@prisma/client'
import { db } from '@utils/prisma'
import { CreatePostInput } from 'src/__generated__/schema.generated'

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
  // TODO: Check for valid issue url
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
