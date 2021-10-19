import { builder } from '@graphql/builder'

import { createReport } from './mutations/createReport'

builder.prismaObject('Report', {
  findUnique: (report) => ({ id: report.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    type: t.exposeString('type'),
    message: t.exposeString('message'),

    // Timestamps
    createdAt: t.expose('createdAt', { type: 'DateTime' }),

    // Relations
    user: t.relation('user'),
    post: t.relation('post', { nullable: true })
  })
})

const CreateReportInput = builder.inputType('CreateReportInput', {
  fields: (t) => ({
    message: t.string({ validate: { minLength: 1, maxLength: 10000 } }),
    type: t.string()
  })
})

builder.mutationField('createReport', (t) =>
  t.prismaField({
    type: 'Report',
    args: { input: t.arg({ type: CreateReportInput }) },
    resolve: async (query, parent, { input }, { session }) => {
      return await createReport(query, input, session)
    }
  })
)
