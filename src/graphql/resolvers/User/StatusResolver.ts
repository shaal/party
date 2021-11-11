import { builder } from '@graphql/builder'

builder.prismaObject('Status', {
  findUnique: (status) => ({ id: status.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    cash: t.exposeString('emoji'),
    paypal: t.exposeString('text'),

    // Relations
    user: t.relation('user')
  })
})

const EditTipsInput = builder.inputType('EditTipsInput', {
  fields: (t) => ({
    cash: t.string({ required: false, validate: { maxLength: 50 } }),
    paypal: t.string({ required: false, validate: { maxLength: 50 } }),
    github: t.string({ required: false, validate: { maxLength: 50 } }),
    buymeacoffee: t.string({ required: false, validate: { maxLength: 50 } }),
    bitcoin: t.string({ required: false, validate: { maxLength: 50 } }),
    ethereum: t.string({ required: false, validate: { maxLength: 50 } }),
    solana: t.string({ required: false, validate: { maxLength: 50 } })
  })
})

builder.mutationField('editTips', (t) =>
  t.prismaField({
    type: 'Tip',
    args: { input: t.arg({ type: EditTipsInput }) },
    resolve: async (query, parent, { input }, { session }) => {
      const data = {
        cash: input.cash,
        paypal: input.paypal,
        github: input.github,
        buymeacoffee: input.buymeacoffee,
        bitcoin: input.bitcoin,
        ethereum: input.ethereum,
        solana: input.solana
      }

      return await db.tip.upsert({
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
