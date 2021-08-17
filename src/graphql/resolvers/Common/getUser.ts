import { db } from '../../../utils/prisma'

export const getUser = async (userId: string) => {
  return await db.user.findUnique({
    where: { id: userId }
  })
}
