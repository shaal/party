import { builder } from '~/graphql/builder'
import { db } from '~/utils/prisma'

import { wakatimeActivity } from './wakatimeActivity'

builder.prismaObject('Integration', {
  findUnique: (integration) => ({ id: integration.id }),
  fields: (t) => ({
    id: t.exposeID('id', {}),
    hasWakatime: t.field({
      type: 'Boolean',
      resolve: async (root) => {
        const hasWakatime = await db.integration.findUnique({
          where: { id: root.id }
        })
        return hasWakatime ? true : false
      }
    }),
    wakatimeActivity: t.field({
      type: 'String',
      nullable: true,
      resolve: async (root) => {
        return await wakatimeActivity(root.id as string)
      }
    }),

    // Timestamps
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' })
  })
})

builder.queryField('integration', (t) =>
  t.prismaField({
    type: 'Integration',
    args: {
      userId: t.arg.id({})
    },
    nullable: true,
    resolve: async (query, root, { userId }) => {
      return await db.integration.findFirst({
        where: { userId }
      })
    }
  })
)
