import { db } from '@utils/prisma'

/**
 * Check whether user voted for a poll
 * @param currentUserId - Current user ID
 * @param pollId - Poll ID need to check it is voted
 * @returns the user has voted the poll
 */
export const hasVoted = async (currentUserId: string, pollId: string) => {
  const user = await db.poll.findUnique({
    where: { id: pollId },
    include: {
      answers: {
        select: {
          voters: { where: { id: currentUserId }, select: { id: true } }
        }
      }
    }
  })

  const votes = user?.answers?.map((answer: any) => {
    if (answer?.voters[0]) {
      return true
    }
  })

  return votes?.includes(true) ? true : false
}
