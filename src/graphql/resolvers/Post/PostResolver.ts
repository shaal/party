import { builder } from '@graphql/builder'
import { db } from '@utils/prisma'
import urlRegexSafe from 'url-regex-safe'

import { hasLiked } from '../Like/queries/hasLiked'
import { Result } from '../ResultResolver'
import { createPost } from './mutations/createPost'
import { deletePost } from './mutations/deletePost'
import { editPost } from './mutations/editPost'
import { exploreFeed } from './queries/exploreFeed'
import { getMorePostsByUser } from './queries/getMorePostsByUser'
import { homeFeed } from './queries/homeFeed'

builder.prismaObject('Post', {
  findUnique: (post) => ({ id: post.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    title: t.exposeString('title', { nullable: true }),
    body: t.exposeString('body'),
    type: t.exposeString('type'),
    done: t.exposeBoolean('done'),
    attachments: t.expose('attachments', {
      type: 'Attachments',
      nullable: true
    }),
    hasLiked: t.field({
      type: 'Boolean',
      resolve: async (parent, args, { session }) => {
        if (!session) return false
        return await hasLiked(session?.userId as string, parent.id)
      }
    }),
    oembedUrl: t.field({
      type: 'String',
      nullable: true,
      resolve: async (parent) => {
        try {
          // @ts-ignore
          return parent.body.match(urlRegexSafe())[0]
        } catch {
          return null
        }
      }
    }),

    // Timestamps
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),

    // Relations
    user: t.relation('user'),
    product: t.relation('product', { nullable: true }),
    parent: t.relation('parent', { nullable: true }),
    commit: t.relation('commit', { nullable: true }),
    replies: t.relatedConnection('replies', {
      cursor: 'id',
      totalCount: true,
      query: () => ({
        where: { user: { spammy: false }, hidden: false },
        orderBy: { createdAt: 'desc' }
      })
    }),
    likes: t.relatedConnection('likes', { cursor: 'id', totalCount: true })
  })
})

builder.queryField('morePostsByUser', (t) =>
  t.prismaConnection({
    type: 'Post',
    cursor: 'id',
    args: {
      userId: t.arg.id(),
      type: t.arg.string()
    },
    resolve: async (query, parent, { userId, type }) => {
      return await getMorePostsByUser(query, userId, type)
    }
  })
)

builder.queryField('homeFeed', (t) =>
  t.prismaConnection({
    type: 'Post',
    cursor: 'id',
    defaultSize: 20,
    maxSize: 100,
    authScopes: { user: true },
    args: { type: t.arg.string({ defaultValue: 'ALL' }) },
    resolve: async (query, parent, { type }, { session }) => {
      return await homeFeed(query, type, session)
    }
  })
)

builder.queryField('exploreFeed', (t) =>
  t.prismaConnection({
    type: 'Post',
    cursor: 'id',
    defaultSize: 20,
    maxSize: 100,
    resolve: async (query) => {
      return await exploreFeed(query)
    }
  })
)

builder.queryField('post', (t) =>
  t.prismaField({
    type: 'Post',
    args: { id: t.arg.id() },
    resolve: async (query, parent, { id }) => {
      return await db.post.findFirst({
        ...query,
        where: { id, hidden: false },
        rejectOnNotFound: true
      })
    }
  })
)

const CreatePostInput = builder.inputType('CreatePostInput', {
  fields: (t) => ({
    title: t.string({
      required: false,
      validate: { minLength: 1, maxLength: 190 }
    }),
    parentId: t.id({ required: false }),
    productId: t.id({ required: false }),
    body: t.string({ validate: { minLength: 1, maxLength: 10000 } }),
    done: t.boolean({ defaultValue: true }),
    attachments: t.string({ required: false }),
    type: t.string({ defaultValue: 'POST' })
  })
})

builder.mutationField('createPost', (t) =>
  t.prismaField({
    type: 'Post',
    args: { input: t.arg({ type: CreatePostInput }) },
    resolve: async (query, parent, { input }, { session }) => {
      return await createPost(query, input, session)
    }
  })
)

const EditPostInput = builder.inputType('EditPostInput', {
  fields: (t) => ({
    id: t.id(),
    body: t.string({ required: false }),
    done: t.boolean({ required: false })
  })
})

builder.mutationField('editPost', (t) =>
  t.prismaField({
    type: 'Post',
    args: { input: t.arg({ type: EditPostInput }) },
    resolve: async (query, parent, { input }, { session }) => {
      return await editPost(query, input, session)
    }
  })
)

const DeletePostInput = builder.inputType('DeletePostInput', {
  fields: (t) => ({
    id: t.id()
  })
})

builder.mutationField('deletePost', (t) =>
  t.field({
    type: Result,
    args: { input: t.arg({ type: DeletePostInput }) },
    resolve: async (parent, { input }, { session }) => {
      return await deletePost(input, session)
    }
  })
)
