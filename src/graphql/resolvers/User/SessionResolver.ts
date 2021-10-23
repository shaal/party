import { builder } from '@graphql/builder'
import { db } from '@utils/prisma'
import { resolveSession } from '@utils/sessions'

import { Result } from '../ResultResolver'
import { getSessions } from './queries/getSessions'

builder.prismaObject('Session', {
  findUnique: (session) => ({ id: session.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    isStaff: t.exposeBoolean('isStaff'),
    ipAddress: t.exposeString('ipAddress', { nullable: true }),
    userAgent: t.exposeString('userAgent', { nullable: true }),
    current: t.field({
      type: 'Boolean',
      resolve: async (parent, args, { session, req, res }) => {
        if (!session) return false
        // @ts-ignore
        const resolve = await resolveSession({ req, res })
        return parent.id === resolve?.id
      }
    }),

    // Timestamps
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    expiresAt: t.expose('expiresAt', { type: 'DateTime' }),

    // Relations
    user: t.relation('user')
  })
})

builder.queryField('sessions', (t) =>
  t.prismaConnection({
    type: 'Session',
    cursor: 'id',
    defaultSize: 20,
    maxSize: 100,
    authScopes: { user: true },
    nullable: true,
    resolve: async (query, parent, args, { session }) => {
      return await getSessions(query, session)
    }
  })
)

const RevokeSessionInput = builder.inputType('RevokeSessionInput', {
  fields: (t) => ({
    id: t.id({ validate: { uuid: true } })
  })
})

builder.mutationField('revokeSession', (t) =>
  t.field({
    type: Result,
    args: { input: t.arg({ type: RevokeSessionInput }) },
    authScopes: { user: true, $granted: 'currentUser' },
    resolve: async (parent, { input }) => {
      await db.session.delete({
        where: { id: input!.id }
      })

      return Result.SUCCESS
    }
  })
)
