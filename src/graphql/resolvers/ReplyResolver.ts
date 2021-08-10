import { db } from '~/utils/prisma'

import { builder } from '../builder'

builder.prismaObject('Reply', {
  findUnique: (reply) => ({ id: reply.id }),
  fields: (t) => ({
    id: t.exposeID('id', {}),
    body: t.exposeString('body', {}),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),

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
    type: 'Reply',
    cursor: 'id',
    args: {
      where: t.arg({ type: WhereRepliesInput, required: false })
    },
    resolve: async (query, root, { where }, ctx) => {
      return await db.reply.findMany({
        ...query,
        where: {
          post: {
            id: where?.postId as string
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
    }
  })
)

builder.queryField('reply', (t) =>
  t.prismaField({
    type: 'Reply',
    args: {
      id: t.arg.id({})
    },
    resolve: (query, root, { id }) => {
      return db.reply.findFirst({
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
    body: t.string({ validate: { minLength: 1, maxLength: 1000 } })
  })
})

builder.mutationField('createReply', (t) =>
  t.prismaField({
    type: 'Reply',
    args: {
      input: t.arg({ type: CreateReplyInput })
    },
    resolve: (query, root, { input }, { session }) => {
      return db.reply.create({
        data: {
          userId: session!.userId,
          body: input.body
        }
      })
    }
  })
)
