import { PrismaClient } from '@prisma/client'
import { md5 } from 'hash-wasm'

import { hashPassword } from '../src/utils/auth'
import { userData } from './seeds/user'

const db = new PrismaClient()

async function main() {
  console.log('Start seeding...')
  for (const user of userData) {
    console.log(`Seeding User - @${user.username} ✅`)
    await db.user.create({
      data: {
        email: user.email,
        username: user.username,
        isStaff: user.isStaff,
        hashedPassword: await hashPassword(user.username),
        profile: {
          create: {
            name: user.username,
            avatar: `https://avatar.tobi.sh/${await md5(user.email)}.svg`
          }
        }
      }
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
