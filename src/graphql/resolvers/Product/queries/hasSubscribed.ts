import { db } from '@utils/prisma'

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
