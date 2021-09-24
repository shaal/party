import { builder } from '@graphql/builder'
import { db } from '@utils/prisma'

builder.prismaObject('Tip', {
  findUnique: (tip) => ({ id: tip.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    paypal: t.exposeString('paypal', { nullable: true })
  })
})

const EditTipsInput = builder.inputType('EditTipsInput', {
  fields: (t) => ({
    paypal: t.string({ required: false, validate: { maxLength: 50 } })
  })
})

builder.mutationField('editTips', (t) =>
  t.prismaField({
    type: 'Tip',
    args: { input: t.arg({ type: EditTipsInput }) },
    resolve: async (query, parent, { input }, { session }) => {
      return await db.tip.upsert({
        ...query,
        where: { userId: session!.userId },
        update: { paypal: input.paypal },
        create: {
          paypal: input.paypal,
          user: { connect: { id: session!.userId } }
        }
      })
    }
  })
)
