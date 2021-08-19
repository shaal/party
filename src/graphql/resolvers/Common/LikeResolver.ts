import { prisma } from '../../../utils/prisma'
import { builder } from '../../builder'
import { togglePostLike } from '../Post/mutations/togglePostLike'
import { toggleReplyLike } from '../Reply/mutations/toggleReplyLike'

builder.prismaObject(prisma.like, {
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
    type: prisma.post,
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

const ToggleReplyLikeInput = builder.inputType('ToggleReplyLikeInput', {
  fields: (t) => ({
    replyId: t.id({})
  })
})

builder.mutationField('toggleReplyLike', (t) =>
  t.prismaField({
    type: prisma.reply,
    args: {
      input: t.arg({ type: ToggleReplyLikeInput })
    },
    nullable: true,
    authScopes: { user: true },
    resolve: async (query, root, { input }, { session }) => {
      return await toggleReplyLike(
        query,
        session?.userId as string,
        input?.replyId
      )
    }
  })
)
