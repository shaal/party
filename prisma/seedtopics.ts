import 'tsconfig-paths/register'

import { PrismaClient } from '@prisma/client'

import { topicsData } from './seeds/topics'

const db = new PrismaClient()

async function main() {
  // Real Topic
  for (const topic of topicsData) {
    console.log(`🌱 Seeding real topics - #${topic.name} #️⃣`)
    await db.topic.create({
      data: { name: topic.name, featuredAt: new Date() }
    })
  }
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
