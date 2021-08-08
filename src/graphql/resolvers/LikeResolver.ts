import { db } from '~/utils/prisma'

import { builder } from '../builder'

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
    type: 'Like',
    args: {
      input: t.arg({ type: ToggleLikeInput })
    },
    resolve: async (query, root, { input }, { session }) => {
      return db.like.create({
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
  })
)
