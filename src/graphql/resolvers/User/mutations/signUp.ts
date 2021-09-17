import { reservedSlugs } from '@graphql/resolvers/Common/queries/reservedSlugs'
import { hashPassword } from '@utils/auth'
import { db } from '@utils/prisma'
import { createSession } from '@utils/sessions'
import { md5 } from 'hash-wasm'
import { SignupInput } from 'src/__generated__/schema.generated'

export const signUp = async (query: any, input: SignupInput, req: any) => {
  if (reservedSlugs.includes(input.username)) {
    throw new Error(`Username "${input.username}" is reserved by Devparty.`)
  }

  const invite = await db.invite.findFirst({
    where: { code: input.invite }
  })

  if (!invite) {
    throw new Error('Invite code is invalid or expired.')
  }

  try {
    const user = await db.user.create({
      ...query,
      data: {
        username: input.username,
        email: input.email,
        hashedPassword: await hashPassword(input.password),
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
              .toUpperCase()
          }
        },
        integrations: { create: {} }
      }
    })

    await createSession(req, user)

    await db.invite.updateMany({
      where: { code: input.invite },
      data: { usedTimes: { increment: 1 } }
    })

    return user
  } catch (error: PrismaClientKnownRequestError | any) {
    console.log(error)
    if (error.code === 'P2002') {
      throw new Error('Username is already taken!')
    }

    throw new Error('Something went wrong!')
  }
}
