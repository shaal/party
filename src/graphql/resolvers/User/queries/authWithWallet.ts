import { db } from '@utils/prisma'

export const authWithWallet = async (address: string, signature: string) => {
  return await db.user.findUnique({
    where: { ethAddress: address },
    rejectOnNotFound: true
  })
}
