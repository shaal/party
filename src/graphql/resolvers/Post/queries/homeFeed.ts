import { PostType, Session } from '@prisma/client'
import { db } from '@utils/prisma'

export const homeFeed = async (
  query: any,
  type: string,
  session: Session | null | undefined
) => {
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

  return await db.post.findMany({
    ...query,
    where: {
      type: type === 'ALL' ? undefined : (type as PostType),
      OR: [
        {
          user: {
            id: {
              in: [
                // @ts-ignore
                ...following.following.map((user: any) => user.id),
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
                // @ts-ignore
                ...products.subscribedProducts.map((product: any) => product.id)
              ]
            }
          }
        },
        {
          topics: {
            some: {
              topic: {
                id: {
                  // @ts-ignore
                  in: [...topics?.topics.map((topic: any) => topic.id)]
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
