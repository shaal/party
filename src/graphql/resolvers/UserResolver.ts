import { db } from '~/utils/prisma'

import { builder } from '../builder'

builder.prismaObject('User', {
  findUnique: (user) => ({ id: user.id }),
  fields: (t) => ({
    id: t.exposeID('id', {}),
    username: t.exposeString('username', {}),
    profile: t.prismaField({
      type: 'Profile',
      nullable: true,
      resolve: (query, { id }) => {
        return db.profile.findFirst({
          ...query,
          where: {
            userId: id
          }
        })
      }
    })
  })
})

builder.queryField('user', (t) =>
  t.prismaField({
    type: 'User',
    args: {
      username: t.arg.string({})
    },
    resolve: (query, _root, { username }, { session }) => {
      return db.user.findFirst({
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
  t.prismaField({
    type: ['User'],
    resolve: (query, _root, { session }) => {
      return db.user.findMany({
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
      required: false,
      validate: {
        minLength: 1,
        maxLength: 20
      }
    })
  })
})

builder.mutationField('editUser', (t) =>
  t.prismaField({
    type: 'User',
    args: {
      input: t.arg({ type: EditUserInput })
    },
    resolve: (query, _root, { input }, { session }) => {
      return db.user.update({
        ...query,
        where: {
          id: session!.userId
        },
        data: {
          username: input.username ?? undefined
        }
      })
    }
  })
)
