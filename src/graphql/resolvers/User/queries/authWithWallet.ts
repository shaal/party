import { db } from '@utils/prisma'
import { ethers } from 'ethers'
import { PUBLIC_SIGNING_MESSAGE } from 'src/constants'

export const authWithWallet = async (nonce: string, signature: string) => {
  const address = ethers.utils.verifyMessage(
    `${PUBLIC_SIGNING_MESSAGE} ${nonce}`,
    signature
  )

  return await db.user.findFirst({
    where: { integrations: { ethAddress: address } },
    rejectOnNotFound: true
  })
}
