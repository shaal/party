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
