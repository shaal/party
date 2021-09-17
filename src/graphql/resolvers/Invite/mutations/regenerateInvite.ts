import { Session } from '@prisma/client'
import { prisma } from '@utils/prisma'
import { md5 } from 'hash-wasm'

export const regenerateInvite = async (
  query: any,
  session: Session | null | undefined
) => {
  const invite = await prisma.invite.findFirst({
    where: {
      userId: session?.userId
    }
  })

  return await prisma.invite.update({
    ...query,
    where: { id: invite?.id },
    data: {
      code: await (await md5((session?.userId as string) + Math.random()))
        .slice(0, 12)
        .toLowerCase()
    }
  })
}
