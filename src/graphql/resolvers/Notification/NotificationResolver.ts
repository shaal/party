import { builder } from '@graphql/builder'

import { getNotifications } from './queries/getNotifications'

builder.prismaObject('Notification', {
  findUnique: (post) => ({ id: post.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    type: t.exposeString('type'),

    // Timestamps
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),

    // Relations
    receiver: t.relation('receiver'),
    dispatcher: t.relation('dispatcher'),
    like: t.relation('like', { nullable: true })
  })
})

builder.queryField('notifications', (t) =>
  t.prismaConnection({
    type: 'Notification',
    cursor: 'id',
    defaultSize: 20,
    maxSize: 100,
    authScopes: { user: true },
    resolve: async (query, parent, args, { session }) => {
      return await getNotifications(query, session)
    }
  })
)
