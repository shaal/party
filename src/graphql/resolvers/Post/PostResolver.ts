import { builder } from '~/graphql/builder'
import { db } from '~/utils/prisma'

import { hasLiked } from '../Like/queries/hasLiked'
import { createPost } from './mutations/createPost'
import { deletePost } from './mutations/deletePost'
import { editPost } from './mutations/editPost'
import { exploreFeed } from './queries/exploreFeed'
import { getMorePostsByUser } from './queries/getMorePostsByUser'
import { getPosts } from './queries/getPosts'
import { homeFeed } from './queries/homeFeed'

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
      resolve: async (root, args, { session }) => {
        if (!session) return false
        return await hasLiked(session?.userId as string, root.id)
      }
    }),

    // Timestamps
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),

    // Relations
    user: t.relation('user'),
    parent: t.relation('parent', { nullable: true }),
    product: t.relation('product', { nullable: true }),
    replies: t.relatedConnection('replies', {
      cursor: 'id',
      totalCount: true,
      query: () => ({
        orderBy: {
          createdAt: 'desc'
        }
      })
    }),
    likes: t.relatedConnection('likes', { cursor: 'id', totalCount: true })
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
    type: 'Post',
    cursor: 'id',
    defaultSize: 20,
    maxSize: 100,
    args: {
      where: t.arg({ type: WherePostsInput, required: false })
    },
    resolve: async (query, root, { where }) => {
      return await getPosts(query, where)
    }
  })
)
const WhereMorePostsByUserInput = builder.inputType(
  'WhereMorePostsByUserInput',
  {
    fields: (t) => ({
      userId: t.id(),
      type: t.string()
    })
  }
)

builder.queryField('morePostsByUser', (t) =>
  t.prismaConnection({
    type: 'Post',
    cursor: 'id',
    args: {
      where: t.arg({ type: WhereMorePostsByUserInput })
    },
    resolve: async (query, root, { where }) => {
      return await getMorePostsByUser(query, where)
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
    type: 'Post',
    cursor: 'id',
    defaultSize: 20,
    maxSize: 100,
    args: {
      where: t.arg({ type: WhereHomeFeedInput, required: false })
    },
    resolve: async (query, root, { where }, { session }) => {
      return await homeFeed(query, where, session)
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

const WherePostInput = builder.inputType('WherePostInput', {
  fields: (t) => ({
    id: t.id()
  })
})

builder.queryField('post', (t) =>
  t.prismaField({
    type: 'Post',
    args: {
      where: t.arg({ type: WherePostInput })
    },
    resolve: async (query, root, { where }) => {
      return await db.post.findUnique({
        ...query,
        where: { id: where.id, hidden: false },
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
    parentId: t.id({ required: false }),
    productId: t.id({ required: false }),
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
    resolve: async (query, root, { input }, { session }) => {
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
    id: t.id()
  })
})

builder.mutationField('deletePost', (t) =>
  t.prismaField({
    type: 'Post',
    args: {
      input: t.arg({ type: DeletePostInput })
    },
    resolve: async (query, root, { input }, { session }) => {
      return await deletePost(query, input, session)
    }
  })
)
