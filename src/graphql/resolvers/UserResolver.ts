import { User } from '@prisma/client'
import { db } from '~/utils/prisma'
import { builder } from '../builder'

export const UserObject = builder.objectRef<User>('User')

UserObject.implement({
  fields: (t) => ({
    id: t.exposeID('id', {}),
    username: t.exposeString('username', {})
  })
})

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
