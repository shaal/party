import { db } from '@utils/prisma'

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
