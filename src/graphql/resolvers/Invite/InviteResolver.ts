import { builder } from '@graphql/builder'
import { db } from '@utils/prisma'
import { BASE_URL } from 'src/constants'

import { regenerateInvite } from './mutations/regenerateInvite'

builder.prismaObject('Invite', {
  findUnique: (invite) => ({ id: invite.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    code: t.exposeString('code', { nullable: true }),
    usedTimes: t.exposeInt('usedTimes', { nullable: true }),
    htmlUrl: t.field({
      type: 'String',
      resolve: (parent) => {
        return `${BASE_URL}/invite/${parent?.code}`
      }
    }),

    // Relations
    user: t.relation('user')
  })
})

builder.queryField('invite', (t) =>
  t.prismaField({
    type: 'Invite',
    args: { code: t.arg.string() },
    nullable: true,
    resolve: async (query, parent, { code }) => {
      return await db.invite.findFirst({
        ...query,
        where: { code },
        rejectOnNotFound: true
      })
    }
  })
)

builder.mutationField('regenerateInvite', (t) =>
  t.prismaField({
    type: 'Invite',
    authScopes: { user: true },
    resolve: async (query, parent, args, { session }) => {
      return await regenerateInvite(query, session)
    }
  })
)
