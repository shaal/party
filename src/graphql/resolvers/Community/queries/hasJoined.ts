import { db } from '@utils/prisma'

/**
 * Check the user already in the community
 * @param currentUserId - Current user ID
 * @param communityId - Community ID need to join
 * @returns whether user is joined to the community or not
 */
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
