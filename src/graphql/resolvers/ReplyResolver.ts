import { db } from '../../utils/prisma'
import { builder } from '../builder'
import { hasLiked } from '../utils/hasLiked'

builder.prismaObject(db.reply, {
  findUnique: (reply) => ({ id: reply.id }),
  fields: (t) => ({
    id: t.exposeID('id', {}),
    body: t.exposeString('body', {}),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
    hasLiked: t.field({
      type: 'Boolean',
      resolve: async (root, args, ctx, info) => {
        if (!ctx.session) return false
        return await hasLiked(ctx.session?.userId as string, null, root.id)
      }
    }),
    likesCount: t.field({
      type: 'Int',
      resolve: (root) =>
        db.like.count({
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
    type: db.reply,
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
    type: db.reply,
    args: {
      id: t.arg.id({})
    },
    resolve: async (query, root, { id }) => {
      return await db.reply.findFirst({
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
    type: db.reply,
    args: {
      input: t.arg({ type: CreateReplyInput })
    },
    resolve: async (query, root, { input }, { session }) => {
      return await db.reply.create({
        data: {
          userId: session!.userId,
          postId: input.postId,
          body: input.body
        }
      })
    }
  })
)
