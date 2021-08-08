import { db } from '~/utils/prisma'

import { builder } from '../builder'
import { hasLiked } from '../utils/hasLiked'

builder.prismaObject('Like', {
  findUnique: (like) => ({ id: like.id }),
  fields: (t) => ({
    id: t.exposeID('id', {}),
    user: t.relation('user'),
    post: t.relation('post'),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' })
  })
})

const ToggleLikeInput = builder.inputType('ToggleLikeInput', {
  fields: (t) => ({
    postId: t.id({})
  })
})

builder.mutationField('toggleLike', (t) =>
  t.prismaField({
    type: 'Post',
    args: {
      input: t.arg({ type: ToggleLikeInput })
    },
    nullable: true,
    resolve: async (query, root, { input }, { session }) => {
      if (await hasLiked(session?.userId as string, input.postId)) {
        await db.like.deleteMany({
          ...query,
          where: {
            userId: session?.userId,
            postId: input.postId
          }
        })
      } else {
        await db.like.create({
          ...query,
          data: {
            post: {
              connect: {
                id: input.postId
              }
            },
            user: {
              connect: {
                id: session?.userId
              }
            }
          }
        })
      }

      return await db.post.findUnique({
        ...query,
        where: {
          id: input.postId
        }
      })
    }
  })
)
