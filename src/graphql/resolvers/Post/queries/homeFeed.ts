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
  console.log('yoginth', cache)
  cache = JSON.parse(cache)

  // Required user data
  let userFollowing: any
  let userTopics: any

  if (cache) {
    userFollowing = cache.following
    userTopics = cache.topics
  } else {
    const following = await db.user.findUnique({
      where: { id: session?.userId },
      select: { following: { select: { id: true } } }
    })
    const topics = await db.user.findUnique({
      where: { id: session?.userId },
      select: { topics: { select: { id: true } } }
    })
    redis.set(cacheKey, JSON.stringify({ following, topics }), 'EX', 60)
    userFollowing = following
    userTopics = topics
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
        },
        topics: {
          every: {
            topic: {
              id: { in: [...userTopics.topics.map((topic: any) => topic.id)] }
            }
          }
        }
      },
      hidden: false
    },
    orderBy: { createdAt: 'desc' }
  })
}
