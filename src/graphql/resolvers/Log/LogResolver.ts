import { builder } from '@graphql/builder'

import { getLogs } from './queries/getLogs'

builder.prismaObject('Log', {
  findUnique: (log) => ({ id: log.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    action: t.exposeString('action'),
    entityId: t.exposeString('entityId', { nullable: true }),
    ipAddress: t.exposeString('ipAddress', { nullable: true }),

    // Timestamps
    createdAt: t.expose('createdAt', { type: 'DateTime' }),

    // Relations
    user: t.relation('user')
  })
})

builder.queryField('logs', (t) =>
  t.prismaConnection({
    type: 'Log',
    cursor: 'id',
    defaultSize: 20,
    maxSize: 100,
    authScopes: { user: true },
    resolve: async (query, parent, args, { session }) => {
      return await getLogs(query, session)
    }
  })
)
