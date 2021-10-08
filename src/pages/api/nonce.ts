import { db } from '@utils/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address } = req.query
  if (address) {
    const user = await db.user.findUnique({
      where: { ethAddress: address as string }
    })

    if (!user) {
      return res.status(400).send({
        status: 'error',
        message: 'No user associated with this address'
      })
    }

    const nonce = Math.floor(Math.random() * 90000) + 10000

    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: { nonce: nonce.toString() }
    })

    return res.json({ nonce: updatedUser?.nonce })
  } else {
    return res.status(400).send({
      status: 'error',
      message: 'No address provided'
    })
  }
}

export default handler
