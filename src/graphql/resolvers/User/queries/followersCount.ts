import { prisma } from '@utils/prisma'

export const followersCount = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      followedBy: true
    }
  })

  return user?.followedBy?.length as number
}
