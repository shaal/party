import { Post, PostType } from '@prisma/client'
import { db } from '~/utils/prisma'
import { builder } from '../builder'
import { UserObject } from './UserResolver'

export const PostObject = builder.objectRef<Post>('Post')

PostObject.implement({
  fields: (t) => ({
    id: t.exposeID('id', {}),
    title: t.exposeString('title', { nullable: true }),
    body: t.exposeString('body', {}),
    type: t.exposeString('type', {}),
    done: t.exposeBoolean('done', {}),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
    user: t.field({
      type: UserObject,
      nullable: true,
      resolve: ({ userId }) => {
        return db.user.findUnique({
          where: {
            id: userId
          }
        })
      }
    })
  })
})

builder.queryField('posts', (t) =>
  t.field({
    type: [PostObject],
    resolve: (_root, _args, { user }) => {
      return db.post.findMany({
        orderBy: {
          createdAt: 'desc'
        }
      })
    }
  })
)

builder.queryField('post', (t) =>
  t.field({
    type: PostObject,
    args: {
      id: t.arg.id({})
    },
    resolve: (_root, { id }, { user }) => {
      return db.post.findUnique({
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
    type: t.string({ defaultValue: 'POST' })
  })
})

builder.mutationField('createPost', (t) =>
  t.field({
    type: PostObject,
    args: {
      input: t.arg({ type: CreatePostInput })
    },
    resolve: (_root, { input }, { user }) => {
      return db.post.create({
        data: {
          userId: user!.id,
          title: input.title,
          body: input.body,
          done: input.done,
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
  t.field({
    type: PostObject,
    args: {
      input: t.arg({ type: EditPostInput })
    },
    resolve: async (_root, { input }, { user }) => {
      const post = await db.post.findFirst({
        where: {
          id: input.id,
          userId: user!.id
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
  t.field({
    type: PostObject,
    args: {
      input: t.arg({ type: DeletePostInput })
    },
    resolve: async (_root, { input }, { user }) => {
      const post = await db.post.findFirst({
        where: {
          id: input.id,
          // NOTE: We add the user ID here to ensure that users can only
          // edit their own posts.
          userId: user!.id
        },

        // Just reject if the record is not found:
        rejectOnNotFound: true
      })

      return db.post.delete({
        where: { id: post.id }
      })
    }
  })
)
