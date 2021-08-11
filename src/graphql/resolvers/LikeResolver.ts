import { builder } from '../builder'
import { togglePostLike } from '../utils/togglePostLike'
import { toggleReplyLike } from '../utils/toggleReplyLike'

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

const TogglePostLikeInput = builder.inputType('TogglePostLikeInput', {
  fields: (t) => ({
    postId: t.id({})
  })
})

builder.mutationField('togglePostLike', (t) =>
  t.prismaField({
    type: 'Post',
    args: {
      input: t.arg({ type: TogglePostLikeInput })
    },
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

const ToggleReplyLikeInput = builder.inputType('ToggleReplyLikeInput', {
  fields: (t) => ({
    replyId: t.id({})
  })
})

builder.mutationField('toggleReplyLike', (t) =>
  t.prismaField({
    type: 'Reply',
    args: {
      input: t.arg({ type: ToggleReplyLikeInput })
    },
    nullable: true,
    resolve: async (query, root, { input }, { session }) => {
      return await toggleReplyLike(
        query,
        session?.userId as string,
        input?.replyId
      )
    }
  })
)
