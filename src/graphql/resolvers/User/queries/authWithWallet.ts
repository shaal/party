import { db } from '@utils/prisma'
import { ethers } from 'ethers'
import { PUBLIC_SIGNING_MESSAGE } from 'src/constants'

/**
 * Authenticate a user with Wallet
 * @param nonce - Unique nonce generated on sign request
 * @param signature - Generated from wallet
 * @returns the authenticated user
 */
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
