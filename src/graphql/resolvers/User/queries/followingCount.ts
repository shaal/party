import { prisma } from '../../../../utils/prisma'

export const followingCount = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      following: true
    }
  })

  return user?.following?.length as number
}
