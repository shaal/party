import { reservedSlugs } from '@graphql/resolvers/Common/queries/reservedSlugs'
import { hashPassword } from '@utils/auth'
import { db } from '@utils/prisma'
import { md5 } from 'hash-wasm'
import { JoinWaitlistInput } from 'src/__generated__/schema.generated'

export const joinWaitlist = async (query: any, input: JoinWaitlistInput) => {
  if (reservedSlugs.includes(input.username)) {
    throw new Error(`Username "${input.username}" is reserved by Devparty.`)
  }

  try {
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
  } catch (error: PrismaClientKnownRequestError | any) {
    if (error.code === 'P2002') {
      if (error.meta.target === 'users_username_key')
        throw new Error('Username is already taken!')
      if (error.meta.target === 'users_email_key')
        throw new Error('Email is already taken!')
    }

    throw new Error('Something went wrong!')
  }
}
