import { prisma } from '../../../../utils/prisma'
import { hasFollowed } from '../queries/hasFollowed'

export const toggleFollow = async (currentUserId: string, userId: string) => {
  // Unfollow
  if (await hasFollowed(currentUserId, userId)) {
    return await prisma.user.update({
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
  const user = await prisma.user.update({
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
