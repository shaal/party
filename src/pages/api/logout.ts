import { Session } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

import { removeSession, resolveSession } from '~/utils/sessions'

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await resolveSession({ req, res })
  await removeSession(req, session as Session)
  return res.redirect('/')
}

export default logout
