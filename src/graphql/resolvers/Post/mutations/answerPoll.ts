import { db } from '@utils/prisma'

export const answerPoll = async (
  query: any,
  userId: string,
  postId: string
) => {
  try {
    const poll = db.pollAnswer.update({
      where: { id: postId },
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
