import { createLog } from '@graphql/resolvers/Log/mutations/createLog'
import { Session } from '@prisma/client'
import { removeSession, resolveSession } from '@utils/sessions'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { warmup } = req.query

  if (warmup) return res.status(200).json({ status: 'Warmed up!' })

  const session = await resolveSession({ req, res })
  await removeSession(req, session as Session)
  createLog(session?.userId, session?.userId, 'LOGOUT')
  return res.redirect('/')
}

export default handler
