import { db } from '@utils/prisma'

/**
 * Check whether user is following or not
 * @param currentUserId - Current user ID
 * @param userId - Target user ID
 * @returns whether user is following or not
 */
export const isFollowing = async (currentUserId: string, userId: string) => {
  const user = await db.user.findUnique({
    where: { id: userId },
    include: {
      following: { where: { id: currentUserId } }
    }
  })

  return user?.following?.length === 0 ? false : true
}
