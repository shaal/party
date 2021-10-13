import { Session } from '@prisma/client'
import { db } from '@utils/prisma'
import { CreatePostInput } from 'src/__generated__/schema.generated'

/**
 * Creates a new commit
 * @param query - Contains an include object to pre-load data needed to resolve nested parts.
 * @param input - CreatePostInput
 * @param session - Current user's session
 * @returns a new commit
 */
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
      type: 'COMMIT',
      productId: input.productId ? input.productId : null
    }
  })

  return commit
}
