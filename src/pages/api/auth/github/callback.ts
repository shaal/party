import { db } from '@utils/prisma'
import { createSession, sessionOptions } from '@utils/sessions'
import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSession } from 'next-iron-session'
import { Octokit } from 'octokit'
import { ERROR_MESSAGE, IS_PRODUCTION } from 'src/constants'

import { Session } from '.prisma/client'

interface NextApiRequestWithSession extends NextApiRequest {
  session: Session
}

const handler = async (
  req: NextApiRequestWithSession,
  res: NextApiResponse
) => {
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

    const octokit = new Octokit({ auth: accessTokenResponse?.access_token })
    const {
      data: { id }
    } = await octokit.rest.users.getAuthenticated()

    const integration = await db.integration.findFirst({
      where: { githubId: id.toString() },
      include: { user: true }
    })

    await createSession(req, integration?.user as any)

    return res.json({ octokit: integration })
  } catch (error: any) {
    return res.json({
      status: 'error',
      message: IS_PRODUCTION ? ERROR_MESSAGE : error.message
    })
  }
}

export default withIronSession(handler, sessionOptions)
