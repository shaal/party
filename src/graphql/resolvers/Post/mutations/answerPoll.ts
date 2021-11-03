import { db } from '@utils/prisma'
import { ERROR_MESSAGE, IS_PRODUCTION } from 'src/constants'

import { hasVoted } from '../queries/hasVoted'

/**
 * Answer the Poll
 * @param query - Contains an include object to pre-load data needed to resolve nested parts.
 * @param userId - Current user ID
 * @param answerId - Answer ID to be answered
 * @returns the answered poll
 */
export const answerPoll = async (
  query: Record<string, unknown>,
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
    throw new Error(IS_PRODUCTION ? ERROR_MESSAGE : error)
  }
}
