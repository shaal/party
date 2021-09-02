import { builder } from '~/graphql/builder'

builder.prismaObject('Invite', {
  findUnique: (invite) => ({ id: invite.id }),
  fields: (t) => ({
    id: t.exposeID('id', {}),
    code: t.exposeString('code', { nullable: true }),
    usedTimes: t.exposeInt('usedTimes', { nullable: true })
  })
})
