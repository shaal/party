import { PrismaClient } from '@prisma/client'
import { md5 } from 'hash-wasm'

import { hashPassword } from '../src/utils/auth'
import { postData } from './seeds/posts'
import { userData } from './seeds/user'

const db = new PrismaClient()

async function main() {
  // User
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
            name: user.name,
            avatar: `https://avatar.tobi.sh/${await md5(user.email)}.svg`
          }
        }
      }
    })
  }

  // Post
  for (const post of postData) {
    console.log(`Seeding Post - ${post.body} ✅`)
    await db.post.create({
      data: {
        body: post.body,
        user: {
          connect: {
            username: post.username
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
