import { builder } from '@graphql/builder'

builder.prismaObject('PostPoll', {
  findUnique: (poll) => ({ id: poll.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    choice1: t.exposeString('choice1'),
    choice2: t.exposeString('choice2'),
    choice3: t.exposeString('choice3', { nullable: true }),
    choice4: t.exposeString('choice4', { nullable: true }),

    // Relations
    post: t.relation('post'),
    voters: t.relatedConnection('voters', { cursor: 'id', totalCount: true })
  })
})
