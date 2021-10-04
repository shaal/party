import { db } from '@utils/prisma'

import { hasVoted } from '../queries/hasVoted'

export const answerPoll = async (
  query: any,
  userId: string,
  answerId: string
) => {
  try {
    const answer = await db.pollAnswer.findUnique({ where: { id: answerId } })
    if (await hasVoted(userId, answer?.pollId as string)) {
      throw new Error('Already voted!')
    }
    const poll = db.pollAnswer.update({
      where: { id: answerId },
      data: {
        voters: {
          connect: {
            id: userId
          }
        }
      }
    })

    return poll
  } catch (error: any) {
    throw new Error(
      process.env.NODE_ENV === 'production' ? 'Something went wrong!' : error
    )
  }
}
