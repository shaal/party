import { builder } from '~/graphql/builder'
import { db } from '@utils/prisma'

import { editIntegration } from './mutations/editIntegration'

builder.prismaObject('Integration', {
  findUnique: (integration) => ({ id: integration.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    wakatimeAPIKey: t.field({
      type: 'String',
      nullable: true,
      resolve: async (parent, args, { session }) => {
        if (!session || session.userId !== parent.userId) {
          return null
        }
        const integration = await db.integration.findUnique({
          where: { id: parent.id }
        })
        return integration?.wakatimeAPIKey
      }
    }),
    spotifyRefreshToken: t.field({
      type: 'String',
      nullable: true,
      resolve: async (parent, args, { session }) => {
        if (!session || session.userId !== parent.userId) {
          return null
        }
        const integration = await db.integration.findUnique({
          where: { id: parent.id }
        })
        return integration?.spotifyRefreshToken
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
    args: { userId: t.arg.id({ required: false }) },
    nullable: true,
    resolve: async (query, parent, { userId }, { session }) => {
      return await db.integration.findFirst({
        where: { userId: userId ? userId : session?.userId }
      })
    }
  })
)

const EditIntegrationInput = builder.inputType('EditIntegrationInput', {
  fields: (t) => ({
    wakatimeAPIKey: t.string({ required: false }),
    spotifyRefreshToken: t.string({ required: false })
  })
})

builder.mutationField('editIntegration', (t) =>
  t.prismaField({
    type: 'Integration',
    args: { input: t.arg({ type: EditIntegrationInput }) },
    resolve: async (query, parent, { input }, { session }) => {
      return await editIntegration(input, session)
    }
  })
)
