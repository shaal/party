import { db } from '@utils/prisma'

export const hasSubscribed = async (
  currentUserId: string,
  productId: string
) => {
  const user = await db.product.findUnique({
    where: { id: productId },
    include: {
      subscribers: {
        where: {
          id: currentUserId
        }
      }
    }
  })

  return user?.subscribers?.length === 0 ? false : true
}
