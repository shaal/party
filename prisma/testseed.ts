import 'tsconfig-paths/register'

import { PrismaClient } from '@prisma/client'
import faker from 'faker'

const hplipsum = require('hplipsum')
const db = new PrismaClient()

async function main() {
  await db.post.create({
    data: {
      id: '89bee9b8-a958-48de-8c9d-55e20b75ccf2',
      body: 'Hello, World!',
      type: 'POST',
      user: { connect: { username: 'yoginth' } },
      product: { connect: { slug: 'devparty' } },
      attachments: {
        createMany: {
          data: [
            {
              index: 1,
              type: 'image/png',
              url: `https://placeimg.com/800/480/nature/${faker.datatype.uuid()}`
            },
            {
              index: 2,
              type: 'image/png',
              url: `https://placeimg.com/800/480/nature/${faker.datatype.uuid()}`
            },
            {
              index: 3,
              type: 'image/png',
              url: `https://placeimg.com/800/480/nature/${faker.datatype.uuid()}`
            },
            {
              index: 4,
              type: 'image/png',
              url: `https://placeimg.com/800/480/nature/${faker.datatype.uuid()}`
            }
          ]
        }
      }
    }
  })
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })