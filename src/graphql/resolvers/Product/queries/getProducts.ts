import { prisma } from '@utils/prisma'

export const getProducts = async (query: any) => {
  return await prisma.product.findMany({
    ...query,
    orderBy: {
      createdAt: 'desc'
    }
  })
}
