import { db } from '@utils/prisma'
import { resolveSession } from '@utils/sessions'
import { NextApiRequest, NextApiResponse } from 'next'
import { ERROR_MESSAGE } from 'src/constants'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await resolveSession({ req, res })

  if (!session) {
    return res.status(401).send({
      status: 'error',
      message: 'Not authenticated!'
    })
  }

  try {
    const data = await db.user.findUnique({
      where: { id: session.userId },
      include: {
        profile: true,
        tip: true,
        sessions: true,
        posts: true,
        ownedProducts: true
      }
    })

    return res.status(200).json(data)
  } catch (error: any) {
    return res.status(200).send({
      status: 'error',
      message: ERROR_MESSAGE
    })
  }
}

export default handler
