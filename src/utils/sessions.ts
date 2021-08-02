import { Session, User } from '@prisma/client'
import { db } from './prisma'
import { GetServerSidePropsContext } from 'next'
import { SessionOptions, applySession } from 'next-iron-session'
import { IncomingMessage } from 'http'
import { addSeconds, differenceInSeconds } from 'date-fns'

// The duration that the session will be valid for, in seconds (default is 15 days).
// We will automatically renew these sessions after 25% of the validity period.
const SESSION_TTL = 15 * 24 * 3600

// The key that we store the actual database ID of the session in:
const IRON_SESSION_ID_KEY = 'sessionID'

// Use a custom IncomingMessage type:
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
  cookieName: 'session.info',
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
      expiresAt: addSeconds(new Date(), SESSION_TTL)
    }
  })

  // NOTE: We refine the type here, as next-iron-session will add the session to the request:
  const reqWithSession = req as unknown as ReqWithSession

  reqWithSession.session.set(IRON_SESSION_ID_KEY, session.id)
  await reqWithSession.session.save()

  return session
}

export async function removeSession(req: IncomingMessage, session: Session) {
  // NOTE: We refine the type here, as next-iron-session will add the session to the request:
  const reqWithSession = req as unknown as ReqWithSession

  reqWithSession.session.destroy()

  await db.session.delete({ where: { id: session!.id } })
}

interface PrismaSession extends Session {
  user: User
}

const sessionCache = new WeakMap<IncomingMessage, PrismaSession | null>()
export async function resolveSession({
  req,
  res
}: Pick<GetServerSidePropsContext, 'req' | 'res'>) {
  if (sessionCache.has(req)) {
    return sessionCache.get(req)
  }

  await applySession(req, res, sessionOptions)

  let session: PrismaSession | null = null

  // NOTE: We refine the type here, as next-iron-session will add the session to the request:
  const reqWithSession = req as unknown as ReqWithSession
  const sessionID = reqWithSession.session.get(IRON_SESSION_ID_KEY)

  if (sessionID) {
    session = await db.session.findFirst({
      where: {
        id: sessionID,
        expiresAt: {
          gte: new Date()
        }
      },
      include: {
        user: true
      }
    })

    if (session) {
      // If we resolve a session in the request, we'll automatically renew it 25% of the session has elapsed:
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
