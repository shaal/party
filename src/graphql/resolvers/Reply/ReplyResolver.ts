import { builder } from '~/graphql/builder'
import { prisma } from '~/utils/prisma'

import { hasLiked } from '../Common/hasLiked'
import { createReply } from './mutations/createReply'
import { getReplies } from './queries/getReplies'

builder.prismaObject(prisma.reply, {
  findUnique: (reply) => ({ id: reply.id }),
  fields: (t) => ({
    id: t.exposeID('id', {}),
    body: t.exposeString('body', {}),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
    hasLiked: t.field({
      type: 'Boolean',
      resolve: async (root, args, ctx) => {
        if (!ctx.session) return false
        return await hasLiked(ctx.session?.userId as string, null, root.id)
      }
    }),
    likesCount: t.field({
      type: 'Int',
      resolve: (root) =>
        prisma.like.count({
          where: { replyId: root.id }
        })
    }),

    // Relations
    post: t.relation('post'),
    user: t.relation('user')
  })
})

const WhereRepliesInput = builder.inputType('WhereRepliesInput', {
  fields: (t) => ({
    postId: t.string({
      required: false
    })
  })
})

builder.queryField('replies', (t) =>
  t.prismaConnection({
    type: prisma.reply,
    cursor: 'id',
    args: {
      where: t.arg({ type: WhereRepliesInput, required: false })
    },
    resolve: async (query, root, { where }) => {
      return await getReplies(query, where)
    }
  })
)

builder.queryField('reply', (t) =>
  t.prismaField({
    type: prisma.reply,
    args: {
      id: t.arg.id({})
    },
    resolve: async (query, root, { id }) => {
      return await prisma.reply.findUnique({
        ...query,
        where: {
          id
        },
        rejectOnNotFound: true
      })
    }
  })
)

const CreateReplyInput = builder.inputType('CreateReplyInput', {
  fields: (t) => ({
    body: t.string({ validate: { minLength: 1, maxLength: 1000 } }),
    postId: t.string({})
  })
})

builder.mutationField('createReply', (t) =>
  t.prismaField({
    type: prisma.reply,
    args: {
      input: t.arg({ type: CreateReplyInput })
    },
    resolve: async (query, root, { input }, { session }) => {
      return await createReply(query, input, session)
    }
  })
)
