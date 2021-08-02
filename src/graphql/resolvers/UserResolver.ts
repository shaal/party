import { User } from '@prisma/client'
import { db } from '~/utils/prisma'
import { builder } from '../builder'

export const UserObject = builder.objectRef<User>('User')

UserObject.implement({
  fields: (t) => ({
    id: t.exposeID('id', {}),
    name: t.exposeString('name', {})
  })
})

const EditUserInput = builder.inputType('EditUserInput', {
  fields: (t) => ({
    name: t.string({
      required: false,
      validate: {
        minLength: 1,
        maxLength: 100
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
          // NOTE: Because `name` may be `null`, we use `?? undefined` to ensure that
          // it is either a value, or undefined.
          // https://www.prisma.io/docs/concepts/components/prisma-client/null-and-undefined
          name: input.name ?? undefined
        }
      })
    }
  })
)
