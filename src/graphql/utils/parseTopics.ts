/**
 * Generated the prisma compatible parsed data to inserted
 * @param topics - Array of topics generated in getTopics()
 * @returns prisma compatible parsed data to inserted
 */
export const parseTopics = (topics: any) => {
  if (topics) {
    return topics.map((topic: string) => ({
      topic: {
        connectOrCreate: {
          create: { name: topic },
          where: { name: topic }
        }
      }
    }))
  } else {
    return []
  }
}
