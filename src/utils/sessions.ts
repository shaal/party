import { Session, User } from '@prisma/client'
import { addSeconds, differenceInSeconds } from 'date-fns'
import { IncomingMessage } from 'http'
import { GetServerSidePropsContext } from 'next'
import { applySession, SessionOptions } from 'next-iron-session'

import { db } from './prisma'

const SESSION_TTL = 15 * 24 * 3600
const IRON_SESSION_ID_KEY = 'sessionID'

interface ReqWithSession extends IncomingMessage {
  session: import('next-iron-session').Session
}

if (!process.env.COOKIE_SECRET) {
  console.warn(
    'No `COOKIE_SECRET` environment variable was set. This can cause production errors.'
  )
}

export const sessionOptions: SessionOptions = {
  password: [
    {
      id: 1,
      password: process.env.COOKIE_SECRET as string
    }
  ],
  cookieName: 'devparty_session',
  ttl: SESSION_TTL,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    httpOnly: true
  }
}

export async function createSession(req: IncomingMessage, user: User) {
  const session = await db.session.create({
    data: {
      userId: user.id,
      spammy: user.spammy,
      expiresAt: addSeconds(new Date(), SESSION_TTL)
    }
  })

  const reqWithSession = req as unknown as ReqWithSession

  reqWithSession.session.set(IRON_SESSION_ID_KEY, session.id)
  await reqWithSession.session.save()

  return session
}

export async function removeSession(req: IncomingMessage, session: Session) {
  const reqWithSession = req as unknown as ReqWithSession

  reqWithSession.session.destroy()

  await db.session.delete({ where: { id: session!.id } })
}

const sessionCache = new WeakMap<IncomingMessage, Session | null>()
export async function resolveSession({
  req,
  res
}: Pick<GetServerSidePropsContext, 'req' | 'res'>) {
  if (sessionCache.has(req)) {
    return sessionCache.get(req)
  }

  await applySession(req, res, sessionOptions)

  let session: Session | null = null

  const reqWithSession = req as unknown as ReqWithSession
  const sessionID = reqWithSession.session.get(IRON_SESSION_ID_KEY)

  if (sessionID) {
    session = await db.session.findFirst({
      where: {
        id: sessionID,
        expiresAt: {
          gte: new Date()
        }
      }
    })

    if (session) {
      const shouldRefreshSession =
        differenceInSeconds(session.expiresAt, new Date()) < 0.75 * SESSION_TTL

      if (shouldRefreshSession) {
        await db.session.update({
          where: {
            id: session.id
          },
          data: {
            expiresAt: addSeconds(new Date(), SESSION_TTL)
          }
        })

        await reqWithSession.session.save()
      }
    }
  }

  sessionCache.set(req, session)

  return session
}
