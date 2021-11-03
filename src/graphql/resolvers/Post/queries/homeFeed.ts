import { PostType, Session } from '@prisma/client'
import { db } from '@utils/prisma'
import Redis from 'ioredis'

/**
 * Gets the collection of posts for home page
 * @param query - Contains an include object to pre-load data needed to resolve nested parts.
 * @param type - Post Type
 * @param session - Current user's session
 * @returns the collection of posts for home page
 */
export const homeFeed = async (
  query: Record<string, unknown>,
  type: string,
  session: Session | null | undefined
) => {
  // Redis connection
  const redis = new Redis(process.env.REDIS_URL)

  // Redis cache
  const cacheKey = `${session?.userId}-homefeed`
  let cache: any = await redis.get(cacheKey)
  cache = JSON.parse(cache)

  // Required user data
  let userFollowing: any
  let userProducts: any
  let userTopics: any

  if (cache) {
    userFollowing = cache.following
    userProducts = cache.products
    userTopics = cache.topics
  } else {
    const following = await db.user.findUnique({
      where: { id: session?.userId },
      select: { following: { select: { id: true } } }
    })
    const products = await db.user.findUnique({
      where: { id: session?.userId },
      select: { subscribedProducts: { select: { id: true } } }
    })
    const topics = await db.user.findUnique({
      where: { id: session?.userId },
      select: { topics: { select: { id: true } } }
    })
    redis.set(
      cacheKey,
      JSON.stringify({ following, products, topics }),
      'EX',
      60
    )
    userFollowing = following
    userProducts = products
    userTopics = topics
  }

  return await db.post.findMany({
    ...query,
    where: {
      type: type === 'ALL' ? undefined : (type as PostType),
      OR: [
        {
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
        {
          product: {
            id: {
              in: [
                ...userProducts.subscribedProducts.map(
                  (product: any) => product.id
                )
              ]
            }
          }
        },
        {
          topics: {
            some: {
              topic: {
                id: {
                  in: [...userTopics?.topics.map((topic: any) => topic.id)]
                }
              }
            }
          }
        }
      ],

      hidden: false
    },
    orderBy: { createdAt: 'desc' }
  })
}
