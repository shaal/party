import { builder } from '~/graphql/builder'

import { getNotifications } from './queries/getNotifications'

builder.prismaObject('Notification', {
  findUnique: (post) => ({ id: post.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    type: t.exposeString('type'),
    entityId: t.exposeString('entityId', { nullable: true }),

    // Timestamps
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),

    // Relations
    receiver: t.relation('receiver'),
    dispatcher: t.relation('dispatcher')
  })
})

builder.queryField('notifications', (t) =>
  t.prismaConnection({
    type: 'Notification',
    cursor: 'id',
    defaultSize: 20,
    maxSize: 100,
    authScopes: { user: true },
    resolve: async (query, root, args, { session }) => {
      return await getNotifications(query, session)
    }
  })
)
