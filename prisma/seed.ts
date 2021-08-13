import { PrismaClient } from '@prisma/client'
import { md5 } from 'hash-wasm'

import { hashPassword } from '../src/utils/auth'
import { postData } from './seeds/posts'
import { productData } from './seeds/products'
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

  // Product
  for (const product of productData) {
    console.log(`Seeding Product - #${product.slug} ✅`)
    await db.product.create({
      data: {
        name: product.name,
        slug: product.slug,
        avatar: `https://avatar.tobi.sh/${await md5(product.slug)}.svg`,
        user: {
          connect: {
            username: product.username
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
