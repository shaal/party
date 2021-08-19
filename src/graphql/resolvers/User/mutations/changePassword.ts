import { Session } from '@prisma/client'

import { ChangePasswordInput } from '../../../../__generated__/schema.generated'
import { hashPassword, verifyPassword } from '../../../../utils/auth'
import { prisma } from '../../../../utils/prisma'
import { Result } from '../../ResultResolver'

export const changePassword = async (
  input: ChangePasswordInput,
  session: Session | null | undefined
) => {
  const user = await prisma.user.findUnique({ where: { id: session!.userId } })

  const passwordValid = await verifyPassword(
    user!.hashedPassword,
    input.currentPassword
  )

  if (!passwordValid) {
    throw new Error('Current password was not correct.')
  }

  await prisma.user.update({
    where: { id: user!.id },
    data: {
      hashedPassword: await hashPassword(input.newPassword),
      sessions: {
        deleteMany: {
          id: {
            not: session!.id
          }
        }
      }
    }
  })

  // Logout everywhere
  await prisma.session.deleteMany({
    where: { userId: user!.id }
  })

  return Result.SUCCESS
}
