import { db } from '@utils/prisma'

export const hasVoted = async (currentUserId: string, answerId: string) => {
  const user = await db.pollAnswer.findUnique({
    where: { id: answerId },
    include: {
      voters: { where: { id: currentUserId } }
    }
  })

  return user?.voters?.length === 0 ? false : true
}
