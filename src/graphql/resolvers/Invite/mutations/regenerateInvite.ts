import { Session } from '@prisma/client'
import { db } from '@utils/prisma'
import { md5 } from 'hash-wasm'

/**
 * Regenerate the current user's invite code
 * @param query - Contains an include object to pre-load data needed to resolve nested parts.
 * @param session - Current user session
 * @returns updated invite data
 */
export const regenerateInvite = async (
  query: Record<string, unknown>,
  session: Session | null | undefined
) => {
  const code = await (
    await md5((session?.userId as string) + Math.random().toString())
  )
    .slice(0, 12)
    .toLowerCase()

  return await db.invite.upsert({
    ...query,
    where: { userId: session?.userId },
    update: { code },
    create: { code, user: { connect: { id: session?.userId } } }
  })
}
