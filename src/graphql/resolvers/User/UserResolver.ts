import { builder } from '~/graphql/builder'
import { db } from '~/utils/prisma'

import { modUser } from './mutations/modUser'
import { toggleFollow } from './mutations/toggleFollow'
import { getUsers } from './queries/getUsers'
import { hasFollowed } from './queries/hasFollowed'

builder.prismaObject('User', {
  findUnique: (user) => ({ id: user.id }),
  fields: (t) => ({
    id: t.exposeID('id', {}),
    username: t.exposeString('username', {}),
    spammy: t.exposeBoolean('spammy', {}),
    isVerified: t.exposeBoolean('isVerified', {}),
    isStaff: t.exposeBoolean('isStaff', {}),
    email: t.exposeString('email', { authScopes: { $granted: 'currentUser' } }),
    hasFollowed: t.field({
      type: 'Boolean',
      resolve: async (root, args, { session }) => {
        if (!session) return false
        return await hasFollowed(session?.userId as string, root.id)
      }
    }),

    // Timestamps
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),

    // Relations
    profile: t.relation('profile'),
    products: t.relation('products'),
    invite: t.relation('invite', { nullable: true }),
    posts: t.relatedConnection('posts', {
      cursor: 'id',
      totalCount: true,
      query: () => ({
        orderBy: {
          createdAt: 'desc'
        }
      })
    }),
    followers: t.relatedConnection('followedBy', {
      cursor: 'id',
      totalCount: true
    }),
    following: t.relatedConnection('following', {
      cursor: 'id',
      totalCount: true
    })
  })
})

builder.queryField('user', (t) =>
  t.prismaField({
    type: 'User',
    args: {
      id: t.arg.id({ required: false }),
      username: t.arg.string({ required: false })
    },
    nullable: true,
    resolve: async (query, root, { id, username }) => {
      return await db.user.findUnique({
        ...query,
        where: { id: id as string, username: username as string },
        rejectOnNotFound: true
      })
    }
  })
)

builder.queryField('users', (t) =>
  t.prismaConnection({
    type: 'User',
    cursor: 'id',
    defaultSize: 20,
    maxSize: 100,
    resolve: async (query) => {
      return await getUsers(query)
    }
  })
)

const EditUserInput = builder.inputType('EditUserInput', {
  fields: (t) => ({
    username: t.string({
      required: true,
      validate: { minLength: 1, maxLength: 20 }
    }),
    name: t.string({
      required: true,
      validate: { minLength: 1, maxLength: 50 }
    }),
    bio: t.string({ required: false, validate: { maxLength: 255 } }),
    location: t.string({ required: false, validate: { maxLength: 50 } }),
    avatar: t.string({ required: false }),
    cover: t.string({ required: false })
  })
})

// TODO: Split to function
builder.mutationField('editUser', (t) =>
  t.prismaField({
    type: 'User',
    args: {
      input: t.arg({ type: EditUserInput })
    },
    authScopes: { user: true },
    resolve: async (query, root, { input }, { session }) => {
      return await db.user.update({
        ...query,
        where: {
          id: session!.userId
        },
        data: {
          username: input.username,
          profile: {
            update: {
              name: input.name,
              bio: input.bio,
              location: input.location,
              avatar: input.avatar,
              cover: input.cover
            }
          }
        }
      })
    }
  })
)

const ToggleFollowInput = builder.inputType('ToggleFollowInput', {
  fields: (t) => ({
    userId: t.id({})
  })
})

// TODO: Split to function
builder.mutationField('toggleFollow', (t) =>
  t.prismaField({
    type: 'User',
    args: {
      input: t.arg({ type: ToggleFollowInput })
    },
    nullable: true,
    resolve: async (query, root, { input }, { session }) => {
      return await toggleFollow(session?.userId as string, input?.userId)
    }
  })
)

// Staff Ops
const ModUserInput = builder.inputType('ModUserInput', {
  fields: (t) => ({
    userId: t.id({}),
    isVerified: t.boolean({ required: false }),
    isStaff: t.boolean({ required: false }),
    spammy: t.boolean({ required: false })
  })
})

builder.mutationField('modUser', (t) =>
  t.prismaField({
    type: 'User',
    args: {
      input: t.arg({ type: ModUserInput })
    },
    nullable: true,
    authScopes: {
      isStaff: true
    },
    resolve: async (query, root, { input }) => {
      return modUser(query, input)
    }
  })
)
