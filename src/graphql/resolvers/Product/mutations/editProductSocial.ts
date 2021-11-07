import { EditProductSocialInput } from '@graphql/types.generated'
import { Prisma, Session } from '@prisma/client'
import { db } from '@utils/prisma'
import { ERROR_MESSAGE, IS_PRODUCTION } from 'src/constants'

/**
 * Edit social urls of the product
 * @param query - Contains an include object to pre-load data needed to resolve nested parts.
 * @param input - EditProductSocialInput
 * @param session - Current user's session
 * @returns the updated product
 */
export const editProductSocial = async (
  query: Record<string, unknown>,
  input: EditProductSocialInput,
  session: Session | null | undefined
) => {
  try {
    const product = await db.product.findUnique({
      where: { id: input.id },
      select: { id: true, owner: { select: { id: true } } }
    })

    if (product?.owner?.id !== session?.userId)
      throw new Error("You can't update others product")

    return await db.product.update({
      ...query,
      where: { id: product?.id },
      data: {
        website: input.website as string,
        twitter: input.twitter as string,
        github: input.github as string,
        discord: input.discord as string
      }
    })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(IS_PRODUCTION ? ERROR_MESSAGE : error.message)
    }
  }
}
