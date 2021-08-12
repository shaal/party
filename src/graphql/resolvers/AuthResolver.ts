import { md5 } from 'hash-wasm'

import {
  authenticateUser,
  hashPassword,
  verifyPassword
} from '../../utils/auth'
import { db } from '../../utils/prisma'
import { createSession, removeSession } from '../../utils/sessions'
import { builder } from '../builder'
import { Result } from './ResultResolver'

builder.queryField('me', (t) =>
  t.prismaField({
    type: db.user,
    nullable: true,
    skipTypeScopes: true,
    resolve: (query, root, args, { session }) => {
      if (!session?.userId) {
        return null
      }

      return db.user.findUnique({
        ...query,
        where: { id: session.userId },
        rejectOnNotFound: true
      })
    }
  })
)

builder.mutationField('logout', (t) =>
  t.field({
    type: Result,
    resolve: async (root, args, { req, session }) => {
      await removeSession(req, session!)
      return Result.SUCCESS
    }
  })
)

const LoginInput = builder.inputType('LoginInput', {
  fields: (t) => ({
    email: t.string({
      validate: {
        email: true
      }
    }),
    password: t.string({
      validate: {
        minLength: 6
      }
    })
  })
})

builder.mutationField('login', (t) =>
  t.prismaField({
    type: db.user,
    skipTypeScopes: true,
    authScopes: {
      unauthenticated: false
    },
    args: {
      input: t.arg({ type: LoginInput })
    },
    resolve: async (_query, root, { input }, { req }) => {
      const user = await authenticateUser(input.email, input.password)
      await createSession(req, user)
      return user
    }
  })
)

const SignUpInput = builder.inputType('SignUpInput', {
  fields: (t) => ({
    username: t.string({
      validate: {
        minLength: 1,
        maxLength: 30
      }
    }),
    email: t.string({
      validate: {
        email: true
      }
    }),
    password: t.string({
      validate: {
        minLength: 6
      }
    })
  })
})

builder.mutationField('signUp', (t) =>
  t.prismaField({
    type: db.user,
    skipTypeScopes: true,
    authScopes: {
      unauthenticated: true
    },
    args: {
      input: t.arg({ type: SignUpInput })
    },
    resolve: async (query, root, { input }, { req }) => {
      const user = await db.user.create({
        ...query,
        data: {
          username: input.username,
          email: input.email,
          hashedPassword: await hashPassword(input.password),
          profile: {
            create: {
              name: input.username,
              avatar: `https://avatar.tobi.sh/${await md5(input.email)}.svg`
            }
          }
        }
      })

      await createSession(req, user)

      return user
    }
  })
)

const ChangePasswordInput = builder.inputType('ChangePasswordInput', {
  fields: (t) => ({
    currentPassword: t.string({
      validate: { minLength: 6 }
    }),
    newPassword: t.string({
      validate: { minLength: 6 }
    })
  })
})

builder.mutationField('changePassword', (t) =>
  t.field({
    type: Result,
    args: {
      input: t.arg({ type: ChangePasswordInput })
    },
    resolve: async (root, { input }, { session }) => {
      const user = await db.user.findUnique({ where: { id: session!.userId } })

      const passwordValid = await verifyPassword(
        user!.hashedPassword,
        input.currentPassword
      )

      if (!passwordValid) {
        throw new Error('Current password was not correct.')
      }

      await db.user.update({
        where: { id: user!.id },
        data: {
          hashedPassword: await hashPassword(input.newPassword),
          sessions: {
            deleteMany: {
              id: {
                not: session!.id
              }
            }
          }
        }
      })

      return Result.SUCCESS
    }
  })
)
