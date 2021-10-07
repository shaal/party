import { Session } from '@prisma/client'
import { removeSession, resolveSession } from '@utils/sessions'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await resolveSession({ req, res })
  await removeSession(req, session as Session)
  return res.redirect('/')
}

export default handler
