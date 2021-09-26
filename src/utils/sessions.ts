import { Session, User } from '@prisma/client'
import { addSeconds, differenceInSeconds } from 'date-fns'
import { IncomingMessage } from 'http'
import { GetServerSidePropsContext } from 'next'
import { applySession, SessionOptions } from 'next-iron-session'
import requestIp from 'request-ip'

import { db } from './prisma'

const SESSION_TTL = 182 * 24 * 3600
const IRON_SESSION_ID_KEY = 'sessionID'

interface RequestWithSession extends IncomingMessage {
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
    secure: true,
    sameSite: 'none',
    httpOnly: true,
    domain: 'devparty.io'
  }
}

export async function createSession(request: IncomingMessage, user: User) {
  const session = await db.session.create({
    data: {
      userId: user.id,
      isStaff: user.isStaff,
      expiresAt: addSeconds(new Date(), SESSION_TTL),
      ipAddress: requestIp.getClientIp(request),
      userAgent: request.headers['user-agent']
    }
  })

  const requestWithSession = request as unknown as RequestWithSession
  requestWithSession.session.set(IRON_SESSION_ID_KEY, session.id)
  await requestWithSession.session.save()

  return session
}

export async function removeSession(
  request: IncomingMessage,
  session: Session
) {
  const requestWithSession = request as unknown as RequestWithSession
  requestWithSession.session.destroy()

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
  const requestWithSession = req as unknown as RequestWithSession
  const sessionID = requestWithSession.session.get(IRON_SESSION_ID_KEY)

  if (sessionID) {
    session = await db.session.findFirst({
      where: {
        id: sessionID,
        expiresAt: { gte: new Date() }
      }
    })

    if (session) {
      const shouldRefreshSession =
        differenceInSeconds(session.expiresAt, new Date()) < 0.75 * SESSION_TTL

      if (shouldRefreshSession) {
        await db.session.update({
          where: { id: session.id },
          data: { expiresAt: addSeconds(new Date(), SESSION_TTL) }
        })

        await requestWithSession.session.save()
      }
    }
  }

  sessionCache.set(req, session)

  return session
}
