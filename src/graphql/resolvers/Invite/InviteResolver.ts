import { builder } from '~/graphql/builder'

import { regenerateInvite } from './mutations/regenerateInvite'

builder.prismaObject('Invite', {
  findUnique: (invite) => ({ id: invite.id }),
  fields: (t) => ({
    id: t.exposeID('id', {}),
    code: t.exposeString('code', { nullable: true }),
    usedTimes: t.exposeInt('usedTimes', { nullable: true })
  })
})

builder.mutationField('regenerateInvite', (t) =>
  t.prismaField({
    type: 'Invite',
    authScopes: { user: true },
    resolve: async (query, root, args, { session }) => {
      return await regenerateInvite(query, session)
    }
  })
)
