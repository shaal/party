import { builder } from '@graphql/builder'
import { db } from '@utils/prisma'

export class WaitlistCount {
  count: number

  constructor(count: number) {
    this.count = count
  }
}

export const WaitlistCountObject = builder
  .objectRef<WaitlistCount>('WaitlistCount')
  .implement({
    fields: (t) => ({
      count: t.exposeInt('count')
    })
  })

builder.queryField('waitlistCount', (t) =>
  t.field({
    type: WaitlistCountObject,
    resolve: async () => {
      const count = await db.user.count({ where: { inWaitlist: true } })
      return new WaitlistCount(count)
    }
  })
)
