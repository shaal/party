import { db } from '@utils/prisma'

/**
 * Check whether the user has answered a poll
 * @param currentUserId - Current user ID
 * @param answerId - Answer ID of the poll to check it is answered
 * @returns the user whether they answered a poll
 */
export const hasAnswered = async (currentUserId: string, answerId: string) => {
  const user = await db.pollAnswer.findUnique({
    where: { id: answerId },
    include: {
      voters: { where: { id: currentUserId } }
    }
  })

  return user?.voters?.length === 0 ? false : true
}
