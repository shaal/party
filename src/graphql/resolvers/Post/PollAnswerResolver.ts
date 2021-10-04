import { builder } from '@graphql/builder'

import { answerPoll } from './mutations/answerPoll'
import { hasVoted } from './queries/hasVoted'

builder.prismaObject('PollAnswer', {
  findUnique: (answer) => ({ id: answer.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    title: t.exposeString('title'),
    hasVoted: t.field({
      type: 'Boolean',
      resolve: async (parent, args, { session }) => {
        if (!session) return false
        return await hasVoted(session?.userId as string, parent.id)
      }
    }),
    voters: t.relatedConnection('voters', { cursor: 'id', totalCount: true }),

    // Relations
    poll: t.relation('poll')
  })
})

const AnswerPollInput = builder.inputType('AnswerPollInput', {
  fields: (t) => ({
    id: t.id()
  })
})

builder.mutationField('answerPoll', (t) =>
  t.prismaField({
    type: 'PollAnswer',
    args: { input: t.arg({ type: AnswerPollInput }) },
    authScopes: { user: true },
    nullable: true,
    resolve: async (query, parent, { input }, { session }) => {
      return await answerPoll(query, session?.userId as string, input?.id)
    }
  })
)
