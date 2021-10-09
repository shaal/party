import { db } from '@utils/prisma'

export const hasJoined = async (currentUserId: string, communityId: string) => {
  const product = await db.community.findUnique({
    where: { id: communityId },
    include: {
      members: {
        where: {
          id: currentUserId
        }
      }
    }
  })

  return product?.members?.length === 0 ? false : true
}
