import { builder } from '~/graphql/builder'
import { db } from '~/utils/prisma'

import { wakatimeActivity } from './wakatimeActivity'

builder.prismaObject('Integration', {
  findUnique: (integration) => ({ id: integration.id }),
  fields: (t) => ({
    id: t.exposeID('id', {}),
    wakatimeAPIKey: t.exposeString('wakatimeAPIKey', {
      nullable: true,
      authScopes: { user: true, $granted: 'currentUser' }
    }),
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
      userId: t.arg.id({ required: false })
    },
    nullable: true,
    resolve: async (query, root, { userId }, { session }) => {
      return await db.integration.findFirst({
        where: { userId: userId ? userId : session?.userId }
      })
    }
  })
)

const EditIntegrationInput = builder.inputType('EditIntegrationInput', {
  fields: (t) => ({
    wakatimeAPIKey: t.string({})
  })
})

// TODO: Split to function
builder.mutationField('editIntegration', (t) =>
  t.prismaField({
    type: 'Integration',
    args: {
      input: t.arg({ type: EditIntegrationInput })
    },
    authScopes: { user: true },
    resolve: async (query, root, { input }, { session }) => {
      const integration = await db.integration.findFirst({
        where: { userId: session?.userId }
      })

      if (integration) {
        return await db.integration.update({
          where: {
            id: integration.id
          },
          data: {
            wakatimeAPIKey: input.wakatimeAPIKey
          }
        })
      } else {
        return await db.integration.create({
          data: {
            user: { connect: { id: session?.userId } },
            wakatimeAPIKey: input.wakatimeAPIKey
          }
        })
      }
    }
  })
)
