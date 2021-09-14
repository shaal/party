import { db } from '~/utils/prisma'

export const getProducts = async (query: any) => {
  return await db.product.findMany({
    ...query,
    orderBy: {
      createdAt: 'desc'
    }
  })
}
