import { db } from '@utils/prisma'

/**
 * Checks whether user has subscribed to the product
 * @param currentUserId - Current user ID
 * @param productId - Product ID to check it is subscribed
 * @returns whether user has subscribed to the product
 */
export const hasSubscribed = async (
  currentUserId: string,
  productId: string
) => {
  const product = await db.product.findUnique({
    where: { id: productId },
    include: {
      subscribers: {
        where: {
          id: currentUserId
        }
      }
    }
  })

  return product?.subscribers?.length === 0 ? false : true
}
