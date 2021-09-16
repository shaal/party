import { builder } from '@graphql/builder'

import { wakatime } from './queries/wakatime'

export class Wakatime {
  hours: string

  constructor(hours: string) {
    this.hours = hours
  }
}

export const WakatimeObject = builder
  .objectRef<Wakatime>('Wakatime')
  .implement({
    fields: (t) => ({
      hours: t.exposeString('hours', { nullable: true })
    })
  })

builder.queryField('wakatime', (t) =>
  t.field({
    type: WakatimeObject,
    args: { userId: t.arg.id() },
    nullable: true,
    resolve: async (parent, { userId }) => {
      return await wakatime(userId)
    }
  })
)
