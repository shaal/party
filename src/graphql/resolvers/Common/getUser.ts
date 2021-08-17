import { db } from '../../../utils/prisma'

export const getUser = async (userId: string) => {
  return await db.user.findFirst({
    where: { id: userId }
  })
}
