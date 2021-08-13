import { PrismaClient } from '@prisma/client'
import { md5 } from 'hash-wasm'

import { hashPassword } from '../src/utils/auth'

const db = new PrismaClient()

async function main() {
  await db.user.create({
    data: {
      email: 'yoginth@hey.com',
      username: 'yoginth',
      hashedPassword: await hashPassword('yoginth'),
      profile: {
        create: {
          name: 'Yoginth',
          avatar: `https://avatar.tobi.sh/${await md5('yoginth@hey.com')}.svg`
        }
      }
    }
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
