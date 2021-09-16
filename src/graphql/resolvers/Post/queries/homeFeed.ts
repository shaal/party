import { PostType, Session } from '@prisma/client'
import { db } from '@utils/prisma'
import Redis from 'ioredis'

export const homeFeed = async (
  query: any,
  type: string,
  session: Session | null | undefined
) => {
  // Redis connection
  let redis = new Redis(process.env.REDIS_URL)

  // Redis cache
  const cacheKey = `${session?.userId}-homefeed`
  let cache: any = await redis.get(cacheKey)
  cache = JSON.parse(cache)

  // Required user data
  let userFollowing: any

  if (cache) {
    userFollowing = cache.following
  } else {
    const following = await db.user.findUnique({
      where: { id: session?.userId },
      select: { following: { select: { id: true } } }
    })
    redis.set(cacheKey, JSON.stringify({ following }), 'EX', 60)
    userFollowing = following
  }

  return await db.post.findMany({
    ...query,
    where: {
      type: type === 'ALL' ? undefined : (type as PostType),
      AND: {
        user: {
          id: {
            in: [
              ...userFollowing.following.map((user: any) => user.id),
              session?.userId
            ]
          },
          spammy: false
        }
      },
      hidden: false
    },
    orderBy: { createdAt: 'desc' }
  })
}
