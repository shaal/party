import { builder } from '~/graphql/builder'
import { db } from '~/utils/prisma'

import { editIntegration } from './mutations/editIntegration'
import { wakatimeActivity } from './wakatimeActivity'

builder.prismaObject('Integration', {
  findUnique: (integration) => ({ id: integration.id }),
  fields: (t) => ({
    id: t.exposeID('id', {}),
    wakatimeAPIKey: t.field({
      type: 'String',
      nullable: true,
      resolve: async (root, args, { session }) => {
        if (!session || session.userId !== root.userId) {
          return null
        }
        const integration = await db.integration.findUnique({
          where: { id: root.id }
        })
        return integration?.wakatimeAPIKey
      }
    }),
    spotifyAccessToken: t.field({
      type: 'String',
      nullable: true,
      resolve: async (root, args, { session }) => {
        if (!session || session.userId !== root.userId) {
          return null
        }
        const integration = await db.integration.findUnique({
          where: { id: root.id }
        })
        return integration?.spotifyAccessToken
      }
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

builder.mutationField('editIntegration', (t) =>
  t.prismaField({
    type: 'Integration',
    args: {
      input: t.arg({ type: EditIntegrationInput })
    },
    resolve: async (query, root, { input }, { session }) => {
      return await editIntegration(input, session)
    }
  })
)
