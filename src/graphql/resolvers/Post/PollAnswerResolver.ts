import { builder } from '@graphql/builder'

import { answerPoll } from './mutations/answerPoll'
import { hasAnswered } from './queries/hasAnswered'

builder.prismaObject('PollAnswer', {
  findUnique: (answer) => ({ id: answer.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    title: t.exposeString('title'),
    hasAnswered: t.field({
      type: 'Boolean',
      resolve: async (parent, args, { session }) => {
        if (!session) return false
        return await hasAnswered(session?.userId as string, parent.id)
      }
    }),

    // Relations
    poll: t.relation('poll'),
    voters: t.relatedConnection('voters', { cursor: 'id', totalCount: true })
  })
})

const AnswerPollInput = builder.inputType('AnswerPollInput', {
  fields: (t) => ({
    id: t.id({ validate: { uuid: true } })
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
