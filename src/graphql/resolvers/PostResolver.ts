import { PostType } from '@prisma/client'

import { db } from '~/utils/prisma'

import { builder } from '../builder'
import { hasLiked } from '../utils/hasLiked'

builder.prismaObject('Post', {
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
      resolve: async (root, session) => {
        return await hasLiked(session.userId as string, root.id)
      }
    }),
    likes: t.prismaConnection({
      type: 'Like',
      cursor: 'id',
      resolve: (query) => db.like.findMany(query)
    }),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
    user: t.relation('user')
  })
})

const WherePostsInput = builder.inputType('WherePostsInput', {
  fields: (t) => ({
    userId: t.string({
      required: false
    })
  })
})

builder.queryField('posts', (t) =>
  t.prismaConnection({
    type: 'Post',
    cursor: 'id',
    args: {
      where: t.arg({ type: WherePostsInput, required: false })
    },
    resolve: (query, root, { where }) =>
      db.post.findMany({
        ...query,
        where: {
          user: {
            id: where?.userId as string
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
  })
)

builder.queryField('post', (t) =>
  t.prismaField({
    type: 'Post',
    args: {
      id: t.arg.id({})
    },
    resolve: (query, root, { id }) => {
      return db.post.findFirst({
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
    body: t.string({ validate: { minLength: 1, maxLength: 1000 } }),
    done: t.boolean({ defaultValue: true }),
    attachments: t.string({ required: false }),
    type: t.string({ defaultValue: 'POST' })
  })
})

builder.mutationField('createPost', (t) =>
  t.prismaField({
    type: 'Post',
    args: {
      input: t.arg({ type: CreatePostInput })
    },
    resolve: (query, root, { input }, { session }) => {
      return db.post.create({
        data: {
          userId: session!.userId,
          title: input.title,
          body: input.body,
          done: input.done,
          attachments: input.attachments,
          type: input.type as PostType
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
    type: 'Post',
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

      return db.post.update({
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
    type: 'Post',
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

      return db.post.delete({
        where: { id: post.id }
      })
    }
  })
)
