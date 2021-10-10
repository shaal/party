import { NextApiRequest, NextApiResponse } from 'next'
import { ERROR_MESSAGE } from 'src/constants'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: req.query.code
      })
    }

    const accessToken = await fetch(
      'https://github.com/login/oauth/access_token',
      requestOptions
    )

    const accessTokenResponse = await accessToken.json()

    const user = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `token ${accessTokenResponse?.access_token}`
      }
    })

    return res.json({
      status: 'wip',
      message: await user.json()
    })
  } catch {
    return res.json({
      status: 'error',
      message: ERROR_MESSAGE
    })
  }
}

export default handler
