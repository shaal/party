import { getRandomCover } from '@graphql/utils/getRandomCover'
import { hashPassword } from '@utils/auth'
import { db } from '@utils/prisma'
import { createSession, sessionOptions } from '@utils/sessions'
import { md5 } from 'hash-wasm'
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
      data: { id, login }
    } = await octokit.rest.users.getAuthenticated()

    const integration = await db.integration.findFirst({
      where: { githubId: String(id) },
      include: { user: true }
    })

    if (integration?.user) {
      await createSession(req, integration?.user as any)
    } else {
      const user = await db.user.create({
        data: {
          username: `github-${login}`,
          email: `github-${login}@devparty.io`,
          hashedPassword: await hashPassword(login),
          inWaitlist: true,
          profile: {
            create: {
              name: login,
              avatar: `https://avatar.tobi.sh/${await md5(login)}.svg`,
              cover: getRandomCover().image,
              coverBg: getRandomCover().color
            }
          }
        }
      })
      await createSession(req, user as any)
    }

    return res.json({ octokit: id })
  } catch (error: any) {
    return res.json({
      status: 'error',
      message: IS_PRODUCTION ? ERROR_MESSAGE : error.message
    })
  }
}

export default withIronSession(handler, sessionOptions)
