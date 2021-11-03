import { Session, User } from '@prisma/client'
import { addSeconds, differenceInSeconds } from 'date-fns'
import { IncomingMessage } from 'http'
import { GetServerSidePropsContext } from 'next'
import { applySession, SessionOptions } from 'next-iron-session'
import requestIp from 'request-ip'
import { GRAPHCDN_ENABLED, IS_PRODUCTION } from 'src/constants'

import { db } from './prisma'

/**
 * The duration that the session will be valid for, in seconds (default is 30 days) and
 * we will automatically renew these sessions after 25% of the validity period.
 */
const SESSION_TTL = 30 * 24 * 3600

// The key that we store the actual database ID of the session in
const IRON_SESSION_ID_KEY = 'sessionID'

// Use a custom IncomingMessage type
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
    secure: IS_PRODUCTION,
    sameSite: GRAPHCDN_ENABLED ? 'none' : 'strict',
    httpOnly: true,
    domain: GRAPHCDN_ENABLED ? '.devparty.io' : undefined
  }
}

/**
 * Create session for the given user
 * @param request - HTTP request
 * @param user - Session to be created for the given user
 * @param masquerading - Whether user is masquerading or not
 * @returns session of the given user
 */
export async function createSession(
  request: IncomingMessage,
  user: User,
  masquerading = false
) {
  const session = await db.session.create({
    data: {
      userId: user.id,
      isStaff: user.isStaff,
      expiresAt: addSeconds(new Date(), SESSION_TTL),
      ipAddress: requestIp.getClientIp(request),
      userAgent: request.headers['user-agent'],
      masquerading
    }
  })

  const requestWithSession = request as unknown as RequestWithSession
  requestWithSession.session.set(IRON_SESSION_ID_KEY, session.id)
  await requestWithSession.session.save()

  return session
}

/**
 * Remove session
 * @param request - HTTP request
 * @param session - Session in which need to be removed
 */
export async function removeSession(
  request: IncomingMessage,
  session: Session
) {
  const requestWithSession = request as unknown as RequestWithSession
  requestWithSession.session.destroy()

  await db.session.delete({ where: { id: session!.id } })
}

const sessionCache = new WeakMap<IncomingMessage, Session | null>()

export async function resolveSession(
  { req, res }: Pick<GetServerSidePropsContext, 'req' | 'res'>,
  checkOnboardStatus = false
) {
  if (sessionCache.has(req)) {
    return sessionCache.get(req)
  }

  await applySession(req, res, sessionOptions)

  let session: Session | any = null
  const requestWithSession = req as unknown as RequestWithSession
  const sessionID = requestWithSession.session.get(IRON_SESSION_ID_KEY)

  if (sessionID) {
    session = await db.session.findFirst({
      where: {
        id: sessionID,
        expiresAt: { gte: new Date() }
      },
      include: checkOnboardStatus
        ? { user: { select: { onboarded: true } } }
        : null
    })

    if (session) {
      // If we resolve a session in the request, we'll automatically renew it 25% of the session has elapsed
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
