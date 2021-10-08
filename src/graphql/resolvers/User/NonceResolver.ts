import { builder } from '@graphql/builder'

import { getNonce } from './queries/getNonce'

export class Nonce {
  nonce: string

  constructor(nonce: string) {
    this.nonce = nonce
  }
}

export const NonceObject = builder.objectRef<Nonce>('Nonce').implement({
  fields: (t) => ({
    nonce: t.exposeString('nonce')
  })
})

builder.queryField('getNonce', (t) =>
  t.field({
    type: NonceObject,
    args: { address: t.arg.id() },
    resolve: async (parent, { address }) => {
      return await getNonce(address)
    }
  })
)
