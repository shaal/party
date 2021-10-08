import { db } from '@utils/prisma'

import { Nonce } from '../NonceResolver'

export const getNonce = async (address: string) => {
  const user = await db.user.findUnique({
    where: { ethAddress: address },
    rejectOnNotFound: true
  })
  const nonce = Math.floor(Math.random() * 90000) + 10000

  const updatedUser = await db.user.update({
    where: { id: user.id },
    data: { nonce: nonce.toString() }
  })

  return new Nonce(updatedUser?.nonce as string)
}
