import { db } from '@utils/prisma'
import { ERROR_MESSAGE, IS_PRODUCTION } from 'src/constants'

import { hasJoined } from '../queries/hasJoined'

/**
 * Join the community
 * @param currentUserId - Current user ID
 * @param communityId - Community ID need to join
 * @returns the joined community
 */
export const toggleJoin = async (
  currentUserId: string,
  communityId: string
) => {
  try {
    // Unstar
    if (await hasJoined(currentUserId, communityId)) {
      return await db.community.update({
        where: { id: communityId },
        data: {
          members: {
            disconnect: {
              id: currentUserId
            }
          }
        }
      })
    }

    // Star
    const community = await db.community.update({
      where: { id: communityId },
      data: {
        members: {
          connect: {
            id: currentUserId
          }
        }
      }
    })

    return community
  } catch (error: any) {
    throw new Error(IS_PRODUCTION ? ERROR_MESSAGE : error)
  }
}
