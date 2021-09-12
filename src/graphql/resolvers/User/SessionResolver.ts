import { builder } from '~/graphql/builder'

import { getSessions } from './queries/getSessions'

builder.prismaObject('Session', {
  findUnique: (session) => ({ id: session.id }),
  fields: (t) => ({
    id: t.exposeID('id', {}),
    isStaff: t.exposeBoolean('isStaff', {}),
    userAgent: t.exposeString('userAgent', { nullable: true }),

    // Timestamps
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
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
    resolve: async (query, root, args, { session }) => {
      return await getSessions(query, session)
    }
  })
)
