import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  return res.json({
    status: 'wip',
    message: 'wip'
  })
}

export default handler
