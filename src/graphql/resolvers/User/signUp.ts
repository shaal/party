import { md5 } from 'hash-wasm'

import { SignUpInput } from '../../../__generated__/schema.generated'
import { hashPassword } from '../../../utils/auth'
import { db } from '../../../utils/prisma'
import { createSession } from '../../../utils/sessions'

export const signUp = async (query: any, input: SignUpInput, req: any) => {
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
      }
    }
  })

  await createSession(req, user)

  return user
}
