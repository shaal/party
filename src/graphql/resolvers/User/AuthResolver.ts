import { builder } from '~/graphql/builder'
import { authenticateUser } from '~/utils/auth'
import { prisma } from '~/utils/prisma'
import { createSession, removeSession } from '~/utils/sessions'

import { Result } from '../ResultResolver'
import { changePassword } from './mutations/changePassword'
import { signUp } from './mutations/signUp'

builder.queryField('me', (t) =>
  t.prismaField({
    type: prisma.user,
    nullable: true,
    skipTypeScopes: true,
    resolve: async (query, root, args, { session }) => {
      if (!session?.userId) {
        return null
      }

      return await prisma.user.findUnique({
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
    type: prisma.user,
    skipTypeScopes: true,
    authScopes: {
      unauthenticated: false
    },
    args: {
      input: t.arg({ type: LoginInput })
    },
    resolve: async (_query, root, { input }, { req }) => {
      const user = await authenticateUser(input.email, input.password)
      if (user.spammy) {
        // Don't allow users to login if marked as spammy 😈
        throw new Error('Your account is suspended!')
      } else {
        await createSession(req, user)
        return user
      }
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
    type: prisma.user,
    skipTypeScopes: true,
    authScopes: {
      unauthenticated: true
    },
    args: {
      input: t.arg({ type: SignUpInput })
    },
    resolve: async (query, root, { input }, { req }) => {
      return signUp(query, input, req)
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
      return changePassword(input, session)
    }
  })
)
