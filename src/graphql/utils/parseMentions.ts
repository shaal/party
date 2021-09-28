import { db } from '@utils/prisma'

import { User } from '.prisma/client'

export const parseMentions = async (mentions: string[]) => {
  if (mentions) {
    const users = await db.user.findMany({
      where: { username: { in: mentions } }
    })
    return users.map((user: User) => ({ id: user.id }))
  } else {
    return []
  }
}
