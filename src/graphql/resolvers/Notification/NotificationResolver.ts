import { prisma } from '../../../utils/prisma'
import { builder } from '../../builder'
import { getNotifications } from './queries/getNotifications'

builder.prismaObject(prisma.notification, {
  findUnique: (post) => ({ id: post.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    type: t.exposeString('type'),
    entityId: t.exposeString('entityId', { nullable: true }),
    receiver: t.relation('receiver'),
    dispatcher: t.relation('dispatcher'),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' })
  })
})

builder.queryField('notifications', (t) =>
  t.prismaConnection({
    type: prisma.notification,
    cursor: 'id',
    authScopes: { user: true },
    resolve: async (query, root, args, { session }) => {
      return await getNotifications(query, session)
    }
  })
)
