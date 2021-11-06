import { db } from '@utils/prisma'
import crypto from 'crypto'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address, warmup } = req.query

  if (warmup) return res.status(200).json({ status: 'Warmed up!' })

  if (address) {
    const user = await db.user.findFirst({
      where: { integrations: { ethAddress: address as string } }
    })

    if (!user) {
      return res.status(400).send({
        status: 'error',
        message: 'This address is not associated with any user.'
      })
    }
    const nonce = crypto.randomInt(111111, 999999)
    const updatedIntegration = await db.integration.update({
      where: { userId: user.id },
      data: { ethNonce: nonce.toString() }
    })

    return res.json({ nonce: updatedIntegration?.ethNonce })
  } else {
    return res.json({
      status: 'error',
      message: 'No address provided'
    })
  }
}

export default handler
