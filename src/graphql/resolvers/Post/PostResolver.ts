import { prisma } from '@utils/prisma'

import { builder } from '../../builder'
import { hasLiked } from '../Common/hasLiked'
import { createPost } from './mutations/createPost'
import { deletePost } from './mutations/deletePost'
import { editPost } from './mutations/editPost'
import { getPosts } from './queries/getPosts'
import { homeFeed } from './queries/homeFeed'

builder.prismaObject(prisma.post, {
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
      resolve: async (root, args, { session }) => {
        if (!session) return false
        return await hasLiked(session?.userId as string, root.id, null)
      }
    }),
    likes: t.prismaConnection({
      type: prisma.like,
      cursor: 'id',
      resolve: (query, root) =>
        prisma.like.findMany({
          ...query,
          where: { postId: root.id }
        })
    }),
    likesCount: t.field({
      type: 'Int',
      resolve: (root) =>
        prisma.like.count({
          where: { postId: root.id }
        })
    }),
    repliesCount: t.field({
      type: 'Int',
      resolve: (root) =>
        prisma.reply.count({
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
    userId: t.id({ required: false }),
    productId: t.id({ required: false }),
    type: t.string({ required: false })
  })
})

builder.queryField('posts', (t) =>
  t.prismaConnection({
    type: prisma.post,
    cursor: 'id',
    args: {
      where: t.arg({ type: WherePostsInput, required: false })
    },
    resolve: async (query, root, { where }) => {
      return await getPosts(query, where)
    }
  })
)

const WhereHomeFeedInput = builder.inputType('WhereHomeFeedInput', {
  fields: (t) => ({
    type: t.string({ required: false, defaultValue: 'ALL' })
  })
})

builder.queryField('homeFeed', (t) =>
  t.prismaConnection({
    type: prisma.post,
    cursor: 'id',
    args: {
      where: t.arg({ type: WhereHomeFeedInput, required: false })
    },
    resolve: async (query, root, { where }, { session }) => {
      return await homeFeed(query, where, session)
    }
  })
)

builder.queryField('post', (t) =>
  t.prismaField({
    type: prisma.post,
    args: {
      id: t.arg.id({})
    },
    resolve: async (query, root, { id }) => {
      return await prisma.post.findUnique({
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
    type: prisma.post,
    args: {
      input: t.arg({ type: CreatePostInput })
    },
    resolve: async (query, root, { input }, { session }) => {
      return await createPost(query, input, session)
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
    type: prisma.post,
    args: {
      input: t.arg({ type: EditPostInput })
    },
    resolve: async (query, root, { input }, { session }) => {
      return await editPost(query, input, session)
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
    type: prisma.post,
    args: {
      input: t.arg({ type: DeletePostInput })
    },
    resolve: async (query, root, { input }, { session }) => {
      return await deletePost(query, input, session)
    }
  })
)
