import { createNotification } from '@graphql/resolvers/Notification/mutations/createNotification'
import { Prisma } from '@prisma/client'
import { db } from '@utils/prisma'
import { ERROR_MESSAGE, IS_PRODUCTION } from 'src/constants'

import { hasSubscribed } from '../queries/hasSubscribed'

/**
 * Subscribe to a product
 * @param currentUserId - Current user ID
 * @param productId - Product ID need to subscribe
 * @returns the subscribed product
 */
export const toggleSubscribe = async (
  currentUserId: string,
  productId: string
) => {
  try {
    // Unstar
    if (await hasSubscribed(currentUserId, productId)) {
      return await db.product.update({
        where: { id: productId },
        data: {
          subscribers: {
            disconnect: {
              id: currentUserId
            }
          }
        }
      })
    }

    // Star
    const product = await db.product.update({
      where: { id: productId },
      data: {
        subscribers: {
          connect: {
            id: currentUserId
          }
        }
      }
    })

    if (currentUserId !== product?.ownerId) {
      createNotification(
        currentUserId,
        product?.ownerId as string,
        product?.id,
        'PRODUCT_SUBSCRIBE'
      )
    }

    return product
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(IS_PRODUCTION ? ERROR_MESSAGE : error.message)
    }
  }
}
