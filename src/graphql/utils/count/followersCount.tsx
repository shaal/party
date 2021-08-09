import { db } from '~/utils/prisma'

export const followersCount = async (id: string) => {
  const user = await db.user.findUnique({
    where: { id },
    include: {
      followedBy: true
    }
  })

  return user?.followedBy?.length as number
}
