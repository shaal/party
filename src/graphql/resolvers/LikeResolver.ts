import { builder } from '../builder'
import { toggleLike } from '../utils/toggleLike'

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
      return await toggleLike(query, session?.userId as string, input?.postId)
    }
  })
)
