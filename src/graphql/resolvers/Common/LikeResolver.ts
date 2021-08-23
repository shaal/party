import { builder } from '~/graphql/builder'
import { db } from '~/utils/prisma'

import { togglePostLike } from '../Post/mutations/togglePostLike'

builder.prismaObject(db.like, {
  findUnique: (like) => ({ id: like.id }),
  fields: (t) => ({
    id: t.exposeID('id', {}),

    // Timestamps
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),

    // Relations
    user: t.relation('user'),
    post: t.relation('post')
  })
})

const TogglePostLikeInput = builder.inputType('TogglePostLikeInput', {
  fields: (t) => ({
    postId: t.id({})
  })
})

builder.mutationField('togglePostLike', (t) =>
  t.prismaField({
    type: db.post,
    args: {
      input: t.arg({ type: TogglePostLikeInput })
    },
    authScopes: { user: true },
    nullable: true,
    resolve: async (query, root, { input }, { session }) => {
      return await togglePostLike(
        query,
        session?.userId as string,
        input?.postId
      )
    }
  })
)
