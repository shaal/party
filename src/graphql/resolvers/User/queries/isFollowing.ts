import { db } from '@utils/prisma'

export const isFollowing = async (currentUserId: string, userId: string) => {
  const user = await db.user.findUnique({
    where: { id: userId },
    include: {
      following: { where: { id: currentUserId } }
    }
  })

  return user?.following?.length === 0 ? false : true
}
