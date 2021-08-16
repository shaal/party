import { db } from '../../utils/prisma'
import { builder } from '../builder'
import { followersCount } from '../utils/count/followersCount'
import { followingCount } from '../utils/count/followingCount'
import { hasFollowed } from '../utils/hasFollowed'
import { toggleFollow } from '../utils/toggleFollow'

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
    products: t.relation('products'),
    posts: t.prismaConnection({
      type: db.post,
      cursor: 'id',
      resolve: (query, root) =>
        db.post.findMany({
          ...query,
          where: { userId: root.id }
        })
    })
  })
})

builder.queryField('user', (t) =>
  t.prismaField({
    type: db.user,
    args: {
      id: t.arg.id({ required: false }),
      username: t.arg.string({ required: false })
    },
    resolve: async (query, root, { id, username }) => {
      return await db.user.findUnique({
        ...query,
        where: {
          id: id as string,
          username: username as string
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
      return await db.user.findMany({
        ...query,
        orderBy: {
          createdAt: 'desc'
        }
      })
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
    avatar: t.string({})
  })
})

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
              avatar: input.avatar
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
