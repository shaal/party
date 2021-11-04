import { NextApiRequest, NextApiResponse } from 'next'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { warmup } = req.query

  if (warmup) {
    return res.status(200).json({ status: 'Warmed up!' })
  }

  return res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user:email`
  )
}

export default handler
