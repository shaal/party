import { db } from '../../../utils/prisma'
import { builder } from '../../builder'
import { modUser } from '../Stafftools/modUser'
import { toggleFollow } from './mutations/toggleFollow'
import { followersCount } from './queries/followersCount'
import { followingCount } from './queries/followingCount'
import { getUsers } from './queries/getUsers'
import { hasFollowed } from './queries/hasFollowed'

builder.prismaObject(db.user, {
  findUnique: (user) => ({ id: user.id }),
  fields: (t) => ({
    id: t.exposeID('id', {}),
    username: t.exposeString('username', {}),
    spammy: t.exposeBoolean('spammy', {}),
    isVerified: t.exposeBoolean('isVerified', {}),
    isStaff: t.exposeBoolean('isStaff', {}),
    email: t.field({
      type: 'String',
      nullable: true,
      resolve: async (root, args, ctx, info) => {
        if (!ctx.session) return null
        return root.email
      }
    }),
    followersCount: t.field({
      type: 'Int',
      resolve: async (root) => await followersCount(root.id)
    }),
    followingCount: t.field({
      type: 'Int',
      resolve: async (root) => await followingCount(root.id)
    }),
    hasFollowed: t.field({
      type: 'Boolean',
      resolve: async (root, args, ctx, info) => {
        if (!ctx.session) return false
        return await hasFollowed(ctx.session?.userId as string, root.id)
      }
    }),

    // Relations
    profile: t.relation('profile'),
    products: t.relation('products')
  })
})

builder.queryField('user', (t) =>
  t.prismaField({
    type: db.user,
    args: {
      username: t.arg.string({})
    },
    resolve: async (query, root, { username }) => {
      return await db.user.findUnique({
        ...query,
        where: {
          username
        },
        rejectOnNotFound: true
      })
    }
  })
)

builder.queryField('users', (t) =>
  t.prismaConnection({
    type: db.user,
    cursor: 'id',
    resolve: async (query, root) => {
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
    email: t.string({
      required: true,
      validate: { email: true }
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
    type: db.user,
    args: {
      input: t.arg({ type: EditUserInput })
    },
    resolve: async (query, root, { input }, { session }) => {
      return await db.user.update({
        ...query,
        where: {
          id: session!.userId
        },
        data: {
          username: input.username,
          email: input.email,
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
    type: db.user,
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
    type: db.user,
    args: {
      input: t.arg({ type: ModUserInput })
    },
    nullable: true,
    resolve: async (query, root, { input }, { session }) => {
      return modUser(input, session)
    }
  })
)
