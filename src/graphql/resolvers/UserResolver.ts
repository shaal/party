import { User } from '@prisma/client'
import { db } from '~/utils/prisma'
import { builder } from '../builder'
import { ProfileObject } from './ProfileResolver'

export const UserObject = builder.objectRef<User>('User')

UserObject.implement({
  fields: (t) => ({
    id: t.exposeID('id', {}),
    username: t.exposeString('username', {}),
    profile: t.field({
      type: ProfileObject,
      nullable: true,
      resolve: ({ id }) => {
        return db.profile.findFirst({
          where: {
            userId: id
          }
        })
      }
    })
  })
})

builder.queryField('user', (t) =>
  t.field({
    type: UserObject,
    args: {
      id: t.arg.id({})
    },
    resolve: (_root, { id }) => {
      return db.user.findUnique({
        where: {
          id
        },
        rejectOnNotFound: true
      })
    }
  })
)

builder.queryField('users', (t) =>
  t.field({
    type: [UserObject],
    args: {
      take: t.arg({ type: 'Int' })
    },
    resolve: (_root, { take }, { user }) => {
      return db.user.findMany({
        take: take as number,
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
  t.field({
    type: UserObject,
    args: {
      input: t.arg({ type: EditUserInput })
    },
    resolve: (_root, { input }, { user }) => {
      return db.user.update({
        where: {
          id: user!.id
        },
        data: {
          username: input.username ?? undefined
        }
      })
    }
  })
)
