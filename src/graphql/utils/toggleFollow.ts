import { db } from '~/utils/prisma'

import { hasFollowed } from './hasFollowed'

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

  return user
}
