import { createLog } from '@graphql/resolvers/Log/mutations/createLog'
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
      data: { id, login, name, bio, avatar_url }
    } = await octokit.rest.users.getAuthenticated()
    const { data: emails } =
      await octokit.rest.users.listEmailsForAuthenticatedUser()
    const githubEmail = emails.find((o: any) => o.primary)?.email

    const integration = await db.integration.findFirst({
      where: { githubId: id.toString() },
      select: { user: true }
    })
    const user = integration?.user

    if (user) {
      await db.user.update({
        where: { email: githubEmail },
        data: {
          profile: {
            update: {
              name: name ? name : login,
              bio: bio,
              github: login
            }
          },
          integrations: {
            update: { githubAccessToken: accessTokenResponse?.access_token }
          }
        }
      })
      if (user?.inWaitlist) {
        return res.redirect('/waitlist')
      } else {
        createLog(user?.id, user?.id, 'LOGIN')
        await createSession(req, user as any, false)

        return res.redirect('/home')
      }
    } else {
      await db.user.create({
        data: {
          username: `github-${login}`,
          email: githubEmail as string,
          hashedPassword: await hashPassword(
            await md5(login + Math.random().toString())
          ),
          inWaitlist: true,
          profile: {
            create: {
              name: name ? name : login,
              avatar: avatar_url,
              cover: getRandomCover().image,
              coverBg: getRandomCover().color,
              bio: bio,
              github: login
            }
          },
          integrations: {
            create: {
              githubId: id.toString(),
              githubAccessToken: accessTokenResponse?.access_token
            }
          }
        }
      })

      return res.redirect('/waitlist')
    }
  } catch (error: any) {
    return IS_PRODUCTION
      ? res.redirect('/500')
      : res.json({
          status: 'error',
          message: IS_PRODUCTION ? ERROR_MESSAGE : error.message
        })
  }
}

export default withIronSession(handler, sessionOptions)
