import { builder } from '@graphql/builder'

import { hasVoted } from './queries/hasVoted'

builder.prismaObject('Poll', {
  findUnique: (poll) => ({ id: poll.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    hasVoted: t.field({
      type: 'Boolean',
      resolve: async (parent, args, { session }) => {
        if (!session) return false
        return await hasVoted(session?.userId as string, parent.id)
      }
    }),

    // Relations
    post: t.relation('post'),
    answers: t.relation('answers', {
      query: () => ({
        orderBy: { index: 'asc' }
      })
    })
  })
})
