import { Post } from '@prisma/client'
import { db } from '~/utils/prisma'
import { builder } from '../builder'
import { UserObject } from './UserResolver'

export const PostObject = builder.objectRef<Post>('Post')

PostObject.implement({
  fields: (t) => ({
    id: t.exposeID('id', {}),
    text: t.exposeString('text', {}),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
    user: t.field({
      type: UserObject,
      nullable: true,
      resolve: (_root, _args, { user }) => {
        return user
      }
    })
  })
})

builder.queryField('posts', (t) =>
  t.field({
    type: [PostObject],
    resolve: (_root, _args, { user }) => {
      return db.post.findMany({
        where: {
          userId: user!.id
        },
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
      return db.post.findFirst({
        where: {
          id,
          userId: user!.id
        },
        rejectOnNotFound: true
      })
    }
  })
)

const CreatePostInput = builder.inputType('CreatePostInput', {
  fields: (t) => ({
    text: t.string({ validate: { minLength: 1 } })
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
          text: input.text
        }
      })
    }
  })
)

const EditPostInput = builder.inputType('EditPostInput', {
  fields: (t) => ({
    id: t.id({}),
    text: t.string({})
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
          // NOTE: We add the user ID here to ensure that users can only
          // edit their own posts.
          userId: user!.id
        },

        // Just reject if the record is not found:
        rejectOnNotFound: true
      })

      return db.post.update({
        where: { id: post.id },
        data: { text: input.text }
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
