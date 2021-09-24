import { Session } from '@prisma/client'
import { db } from '@utils/prisma'
import { md5 } from 'hash-wasm'

export const regenerateInvite = async (
  query: any,
  session: Session | null | undefined
) => {
  const code = await (await md5((session?.userId as string) + Math.random()))
    .slice(0, 12)
    .toLowerCase()

  return await db.invite.upsert({
    ...query,
    where: { userId: session?.userId },
    update: { code },
    create: { code, user: { connect: { id: session?.userId } } }
  })
}
