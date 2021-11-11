import { builder } from '@graphql/builder'
import { db } from '@utils/prisma'

builder.prismaObject('Status', {
  findUnique: (status) => ({ id: status.id }),
  fields: (t) => ({
    emoji: t.exposeString('emoji'),
    text: t.exposeString('text'),

    // Relations
    user: t.relation('user')
  })
})

const EditStatusInput = builder.inputType('EditStatusInput', {
  fields: (t) => ({
    emoji: t.string({ validate: { maxLength: 50 } }),
    text: t.string({ validate: { maxLength: 50 } })
  })
})

// TODO: Split to function
builder.mutationField('editStatus', (t) =>
  t.prismaField({
    type: 'Status',
    args: { input: t.arg({ type: EditStatusInput }) },
    resolve: async (query, parent, { input }, { session }) => {
      const data = {
        emoji: input.emoji,
        text: input.text
      }

      return await db.status.upsert({
        ...query,
        where: { userId: session!.userId },
        update: data,
        create: {
          ...data,
          user: { connect: { id: session!.userId } }
        }
      })
    }
  })
)
