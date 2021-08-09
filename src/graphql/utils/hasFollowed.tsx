import { db } from '~/utils/prisma'

export const hasFollowed = async (userId: string, currentUserId: string) => {
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
