import { md5 } from 'hash-wasm'

import { JoinWaitlistInput } from '~/__generated__/schema.generated'
import { hashPassword } from '~/utils/auth'
import { db } from '@utils/prisma'

import { reservedSlugs } from '../../Common/queries/reservedSlugs'

export const joinWaitlist = async (query: any, input: JoinWaitlistInput) => {
  if (reservedSlugs.includes(input.username)) {
    throw new Error(`Username "${input.username}" is reserved by Devparty.`)
  }

  const user = await db.user.create({
    ...query,
    data: {
      username: input.username,
      email: input.email,
      hashedPassword: await hashPassword(input.password),
      inWaitlist: true,
      profile: {
        create: {
          name: input.username,
          avatar: `https://avatar.tobi.sh/${await md5(input.email)}.svg`
        }
      },
      invite: {
        create: {
          code: await (await md5(input.email + Math.random()))
            .slice(0, 12)
            .toLowerCase()
        }
      },
      integrations: { create: {} }
    }
  })

  return user
}
