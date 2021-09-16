import { builder } from '~/graphql/builder'
import { db } from '@utils/prisma'

import { modUser } from './mutations/modUser'
import { toggleFollow } from './mutations/toggleFollow'
import { getUsers } from './queries/getUsers'
import { getWhoToFollow } from './queries/getWhoToFollow'
import { hasFollowed } from './queries/hasFollowed'

builder.prismaObject('User', {
  findUnique: (user) => ({ id: user.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    username: t.exposeString('username'),
    spammy: t.exposeBoolean('spammy'),
    isVerified: t.exposeBoolean('isVerified'),
    isStaff: t.exposeBoolean('isStaff'),
    inWaitlist: t.exposeBoolean('inWaitlist', {
      authScopes: { isStaff: true }
    }),
    email: t.exposeString('email', {
      authScopes: { isStaff: true, $granted: 'currentUser' }
    }),
    hasFollowed: t.field({
      type: 'Boolean',
      resolve: async (parent, args, { session }) => {
        if (!session) return false
        return await hasFollowed(session?.userId as string, parent.id)
      }
    }),

    // Timestamps
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),

    // Relations
    profile: t.relation('profile'),
    badges: t.relatedConnection('badges', { cursor: 'id', totalCount: true }),
    topics: t.relatedConnection('topics', { cursor: 'id', totalCount: true }),
    posts: t.relatedConnection('posts', {
      cursor: 'id',
      totalCount: true,
      query: () => ({
        where: { hidden: false },
        orderBy: { createdAt: 'desc' }
      })
    }),
    hasWakatimeIntegration: t.field({
      type: 'Boolean',
      resolve: async (parent) => {
        const integration = await db.integration.findFirst({
          where: { userId: parent.id }
        })
        return integration?.wakatimeAPIKey ? true : false
      }
    }),
    hasSpotifyIntegration: t.field({
      type: 'Boolean',
      resolve: async (parent) => {
        const integration = await db.integration.findFirst({
          where: { userId: parent.id }
        })
        return integration?.spotifyRefreshToken ? true : false
      }
    }),
    invite: t.relation('invite', {
      nullable: true,
      authScopes: { isStaff: true, $granted: 'currentUser' }
    }),
    products: t.relatedConnection('products', {
      cursor: 'id',
      totalCount: true
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
    args: { username: t.arg.id() },
    nullable: true,
    resolve: async (query, parent, { username }) => {
      return await db.user.findUnique({
        ...query,
        where: { username },
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

builder.queryField('whoToFollow', (t) =>
  t.prismaConnection({
    type: 'User',
    cursor: 'id',
    resolve: async (query, parent, args, { session }) => {
      return await getWhoToFollow(query, session)
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
    args: { input: t.arg({ type: EditUserInput }) },
    authScopes: { user: true },
    resolve: async (query, parent, { input }, { session }) => {
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
    userId: t.id()
  })
})

// TODO: Split to function
builder.mutationField('toggleFollow', (t) =>
  t.prismaField({
    type: 'User',
    args: { input: t.arg({ type: ToggleFollowInput }) },
    nullable: true,
    resolve: async (query, parent, { input }, { session }) => {
      return await toggleFollow(session?.userId as string, input?.userId)
    }
  })
)

// Staff Ops
const ModUserInput = builder.inputType('ModUserInput', {
  fields: (t) => ({
    userId: t.id(),
    isVerified: t.boolean({ required: false }),
    isStaff: t.boolean({ required: false }),
    spammy: t.boolean({ required: false })
  })
})

builder.mutationField('modUser', (t) =>
  t.prismaField({
    type: 'User',
    args: { input: t.arg({ type: ModUserInput }) },
    nullable: true,
    authScopes: {
      isStaff: true
    },
    resolve: async (query, parent, { input }) => {
      return modUser(query, input)
    }
  })
)

const OnboardUserInput = builder.inputType('OnboardUserInput', {
  fields: (t) => ({
    userId: t.id()
  })
})

builder.mutationField('onboardUser', (t) =>
  t.prismaField({
    type: 'User',
    args: { input: t.arg({ type: OnboardUserInput }) },
    nullable: true,
    resolve: async (query, parent, { input }) => {
      return await db.user.update({
        where: { id: input.userId },
        data: { inWaitlist: false }
      })
    }
  })
)
