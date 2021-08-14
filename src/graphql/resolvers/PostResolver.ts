import { PostType } from '@prisma/client'

import { db } from '../../utils/prisma'
import { builder } from '../builder'
import { hasLiked } from '../utils/hasLiked'

builder.prismaObject(db.post, {
  findUnique: (post) => ({ id: post.id }),
  fields: (t) => ({
    id: t.exposeID('id', {}),
    title: t.exposeString('title', { nullable: true }),
    body: t.exposeString('body', {}),
    type: t.exposeString('type', {}),
    done: t.exposeBoolean('done', {}),
    attachments: t.expose('attachments', {
      type: 'Attachments',
      nullable: true
    }),
    hasLiked: t.field({
      type: 'Boolean',
      resolve: async (root, args, ctx, info) => {
        if (!ctx.session) return false
        return await hasLiked(ctx.session?.userId as string, root.id, null)
      }
    }),
    likes: t.prismaConnection({
      type: db.like,
      cursor: 'id',
      resolve: (query, root) =>
        db.like.findMany({
          ...query,
          where: { postId: root.id }
        })
    }),
    likesCount: t.field({
      type: 'Int',
      resolve: (root) =>
        db.like.count({
          where: { postId: root.id }
        })
    }),
    repliesCount: t.field({
      type: 'Int',
      resolve: (root) =>
        db.reply.count({
          where: { postId: root.id }
        })
    }),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
    user: t.relation('user'),
    product: t.relation('product', { nullable: true }),
    replies: t.relation('replies')
  })
})

const WherePostsInput = builder.inputType('WherePostsInput', {
  fields: (t) => ({
    userId: t.string({ required: false }),
    onlyFollowing: t.boolean({ required: false, defaultValue: true }),
    type: t.string({ required: false })
  })
})

builder.queryField('posts', (t) =>
  t.prismaConnection({
    type: db.post,
    cursor: 'id',
    args: {
      where: t.arg({ type: WherePostsInput, required: false })
    },
    resolve: async (query, root, { where }, { session }) => {
      if (where?.onlyFollowing && session) {
        const following = await db.user.findUnique({
          where: { id: session?.userId },
          select: { following: { select: { id: true } } }
        })

        return await db.post.findMany({
          ...query,
          where: {
            type: where?.type === 'ALL' ? undefined : (where?.type as PostType),
            user: {
              // @ts-ignore
              id: {
                in: [
                  // @ts-ignore
                  ...following.following.map((user) => user.id),
                  session?.userId
                ]
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        })
      } else {
        return await db.post.findMany({
          ...query,
          where: {
            type: where?.type === 'ALL' ? undefined : (where?.type as PostType),
            user: {
              id: where?.userId as string
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        })
      }
    }
  })
)

builder.queryField('post', (t) =>
  t.prismaField({
    type: db.post,
    args: {
      id: t.arg.id({})
    },
    resolve: async (query, root, { id }) => {
      return await db.post.findUnique({
        ...query,
        where: {
          id
        },
        rejectOnNotFound: true
      })
    }
  })
)

const CreatePostInput = builder.inputType('CreatePostInput', {
  fields: (t) => ({
    title: t.string({
      required: false,
      validate: { minLength: 1, maxLength: 255 }
    }),
    productId: t.id({ required: false }),
    body: t.string({ validate: { minLength: 1, maxLength: 1000 } }),
    done: t.boolean({ defaultValue: true }),
    attachments: t.string({ required: false }),
    type: t.string({ defaultValue: 'POST' })
  })
})

builder.mutationField('createPost', (t) =>
  t.prismaField({
    type: db.post,
    args: {
      input: t.arg({ type: CreatePostInput })
    },
    resolve: async (query, root, { input }, { session }) => {
      return await db.post.create({
        data: {
          userId: session!.userId,
          title: input.title,
          body: input.body,
          done: input.done,
          attachments: input.attachments,
          type: input.type as PostType,
          productId: input.productId ? input.productId : null
        }
      })
    }
  })
)

const EditPostInput = builder.inputType('EditPostInput', {
  fields: (t) => ({
    id: t.id({}),
    body: t.string({ required: false }),
    done: t.boolean({ required: false })
  })
})

builder.mutationField('editPost', (t) =>
  t.prismaField({
    type: db.post,
    args: {
      input: t.arg({ type: EditPostInput })
    },
    resolve: async (query, root, { input }, { session }) => {
      const post = await db.post.findFirst({
        ...query,
        where: {
          id: input.id,
          userId: session!.userId
        },

        rejectOnNotFound: true
      })

      return await db.post.update({
        where: { id: post.id },
        data: { body: input.body as string, done: input.done as boolean }
      })
    }
  })
)

const DeletePostInput = builder.inputType('DeletePostInput', {
  fields: (t) => ({
    id: t.id({})
  })
})

builder.mutationField('deletePost', (t) =>
  t.prismaField({
    type: db.post,
    args: {
      input: t.arg({ type: DeletePostInput })
    },
    resolve: async (query, root, { input }, { session }) => {
      const post = await db.post.findFirst({
        ...query,
        where: {
          id: input.id,
          userId: session!.userId
        },

        rejectOnNotFound: true
      })

      return await db.post.delete({
        where: { id: post.id }
      })
    }
  })
)
