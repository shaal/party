import { db } from '~/utils/prisma'

export const hasFollowed = async (currentUserId: string, userId: string) => {
  const user = await db.user.findUnique({
    where: { id: userId },
    include: {
      followedBy: {
        where: {
          id: currentUserId
        }
      }
    }
  })

  return user?.followedBy?.length === 0 ? false : true
}
