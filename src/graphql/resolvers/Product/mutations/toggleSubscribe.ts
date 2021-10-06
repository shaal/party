import { createNotification } from '@graphql/resolvers/Notification/mutations/createNotification'
import { db } from '@utils/prisma'
import { IS_PRODUCTION } from 'src/constants'

import { hasSubscribed } from '../queries/hasSubscribed'

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
        product?.ownerId,
        product?.id,
        'PRODUCT_SUBSCRIBE'
      )
    }

    return product
  } catch (error: any) {
    throw new Error(IS_PRODUCTION ? 'Something went wrong!' : error)
  }
}
