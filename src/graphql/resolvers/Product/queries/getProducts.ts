import { db } from '@utils/prisma'

/**
 * Get all products
 * @param query - Contains an include object to pre-load data needed to resolve nested parts.
 * @returns list of all product
 */
export const getProducts = async (query: any) => {
  return await db.product.findMany({
    ...query,
    orderBy: {
      createdAt: 'desc'
    }
  })
}
