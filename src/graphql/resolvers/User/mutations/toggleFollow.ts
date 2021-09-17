import { createNotification } from '@graphql/resolvers/Notification/mutations/createNotification'
import { db } from '@utils/prisma'

import { hasFollowed } from '../queries/hasFollowed'

export const toggleFollow = async (currentUserId: string, userId: string) => {
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
  const user = await db.user.update({
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
    createNotification(currentUserId, userId, userId, 'FOLLOW')
  }

  return user
}
