import { builder } from '@graphql/builder'

builder.prismaObject('PollAnswer', {
  findUnique: (answer) => ({ id: answer.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    title: t.exposeString('title'),

    // Relations
    poll: t.relation('poll')
  })
})
