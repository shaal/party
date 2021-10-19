import { builder } from '@graphql/builder'

builder.prismaObject('Report', {
  findUnique: (report) => ({ id: report.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    type: t.exposeString('type'),
    message: t.exposeString('message', { nullable: true }),

    // Timestamps
    createdAt: t.expose('createdAt', { type: 'DateTime' }),

    // Relations
    user: t.relation('user'),
    post: t.relation('post', { nullable: true })
  })
})
