import { db } from '@utils/prisma'
import { ethers } from 'ethers'

export const authWithWallet = async (nonce: string, signature: string) => {
  const address = ethers.utils.verifyMessage(
    `Sign into Devparty with this wallet. ${nonce}`,
    signature
  )

  return await db.user.findUnique({
    where: { ethAddress: address },
    rejectOnNotFound: true
  })
}
