import { db } from '@utils/prisma'

import { Nonce } from '../NonceResolver'

export const getNonce = async (address: string) => {
  const user = await db.user.findUnique({
    where: { ethAddress: address }
  })

  return new Nonce(Math.random().toString())
}
