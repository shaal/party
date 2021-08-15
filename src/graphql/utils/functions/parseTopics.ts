import { Prisma } from '@prisma/client'

export const parseTopics = (
  topics: any
): Prisma.TopicCreateOrConnectWithoutPostsInput[] => {
  return topics.map((t: any) => ({
    where: { name: t.toLocaleLowerCase() },
    create: { name: t.toLocaleLowerCase() }
  }))
}
