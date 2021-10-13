import { db } from '@utils/prisma'

/**
 * Check whether user is followed or not
 * @param currentUserId - Current user ID
 * @param userId - Target user ID
 * @returns whether user is followed or not
 */
export const hasFollowed = async (currentUserId: string, userId: string) => {
  const user = await db.user.findUnique({
    where: { id: userId },
    include: {
      followedBy: { where: { id: currentUserId } }
    }
  })

  return user?.followedBy?.length === 0 ? false : true
}
