import { builder } from '@graphql/builder'
import { db } from '@utils/prisma'

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
    totalCount: t.field({
      type: 'Int',
      resolve: async (parent) => {
        return await db.pollAnswer.count({
          where: {
            pollId: parent?.id
          }
        })
      }
    }),

    // Relations
    post: t.relation('post'),
    answers: t.relation('answers', {
      query: () => ({ orderBy: { index: 'asc' } })
    })
  })
})
