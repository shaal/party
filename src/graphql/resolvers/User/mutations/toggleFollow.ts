import { createNotification } from '@graphql/resolvers/Notification/mutations/createNotification'
import { db } from '@utils/prisma'

import { hasFollowed } from '../queries/hasFollowed'
import { User } from '.prisma/client'

export const toggleFollow = async (currentUserId: string, userId: string) => {
  try {
    // Unfollow
    if (await hasFollowed(currentUserId, userId)) {
      return await db.user.update({
        where: { id: userId },
        data: {
          followedBy: {
            disconnect: {
              id: currentUserId
            }
          }
        }
      })
    }

    // Follow
    const user: User = await db.user.update({
      where: { id: userId },
      data: {
        followedBy: {
          connect: {
            id: currentUserId
          }
        }
      }
    })

    if (userId !== currentUserId) {
      createNotification(currentUserId, userId, userId, 'USER_FOLLOW')
    }

    return user
  } catch (error) {
    throw new Error('Something went wrong!')
  }
}
