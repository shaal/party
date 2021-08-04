import { authenticateUser, hashPassword, verifyPassword } from '~/utils/auth'
import { db } from '~/utils/prisma'
import { createSession, removeSession } from '~/utils/sessions'
import { builder } from '../builder'
import { Result } from './ResultResolver'
import { UserObject } from './UserResolver'

builder.queryField('me', (t) =>
  t.field({
    type: UserObject,
    nullable: true,
    skipTypeScopes: true,
    resolve: (_root, _args, { user }) => {
      return user
    }
  })
)

builder.mutationField('logout', (t) =>
  t.field({
    type: Result,
    resolve: async (_root, _args, { req, session }) => {
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
  t.field({
    type: UserObject,
    // The parent auth scope (for the Mutation type) is for authenticated users,
    // so we will need to skip it.
    skipTypeScopes: true,
    authScopes: {
      unauthenticated: true
    },
    args: {
      input: t.arg({ type: LoginInput })
    },
    resolve: async (_root, { input }, { req }) => {
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
  t.field({
    type: UserObject,
    // The parent auth scope (for the Mutation type) is for authenticated users,
    // so we will need to skip it.
    skipTypeScopes: true,
    authScopes: {
      unauthenticated: true
    },
    args: {
      input: t.arg({ type: SignUpInput })
    },
    resolve: async (_root, { input }, { req }) => {
      const user = await db.user.create({
        data: {
          username: input.username,
          email: input.email,
          hashedPassword: await hashPassword(input.password),
          profile: {
            create: {
              name: input.username
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
    resolve: async (_root, { input }, { user, session }) => {
      // First, we make sure that your current password is currect:
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
          // When changing the password, we also delete any sessions that
          // are not our current active session.
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
