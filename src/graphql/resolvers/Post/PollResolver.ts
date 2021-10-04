import { builder } from '@graphql/builder'

builder.prismaObject('Poll', {
  findUnique: (poll) => ({ id: poll.id }),
  fields: (t) => ({
    id: t.exposeID('id'),

    // Relations
    post: t.relation('post'),
    answers: t.relation('answers')
  })
})
