import { db } from '@utils/prisma'
import { resolveSession } from '@utils/sessions'
import Redis from 'ioredis'
import { NextApiRequest, NextApiResponse } from 'next'
import { ERROR_MESSAGE, IS_PRODUCTION } from 'src/constants'

const redis = new Redis(process.env.REDIS_URL)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await resolveSession({ req, res })
  const { warmup } = req.query

  if (warmup) return res.status(200).json({ status: 'Warmed up!' })

  if (!session) {
    return res.status(401).send({
      status: 'error',
      message: 'Not authenticated!'
    })
  }

  try {
    const cacheKey = `export-${session.userId}`

    if (await redis.get(cacheKey)) {
      return res.status(429).send({
        status: 'error',
        message:
          'You downloaded the export recently, Please try again after some days!'
      })
    } else {
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

      redis.set(cacheKey, cacheKey, 'EX', IS_PRODUCTION ? 864000 : 500)

      return res.status(200).json(data)
    }
  } catch (error: any) {
    return res.status(500).send({
      status: 'error',
      message: ERROR_MESSAGE
    })
  }
}

export default handler
