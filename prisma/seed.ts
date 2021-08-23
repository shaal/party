import 'tsconfig-paths/register'

import { PrismaClient } from '@prisma/client'
import faker from 'faker'

import { hashPassword } from '~/utils/auth'

import { productData } from './seeds/products'
import { userData } from './seeds/user'
const db = new PrismaClient()

async function main() {
  await db.user.deleteMany()
  console.log('All users and related data are deleted 🗑️')
  await db.topic.deleteMany()
  console.log('All topics are deleted 🗑️')

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
            avatar: user.avatar,
            bio: user.bio
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
        avatar: product.avatar,
        description: product.description,
        user: {
          connect: {
            username: product.username
          }
        }
      }
    })
  }

  // Post
  for (let i = 0; i < 200; i++) {
    const post = faker.lorem.sentence(20)
    console.log(`Seeding Post - ${post} ✅`)
    await db.post.create({
      data: {
        body: post,
        user: {
          connect: {
            username:
              userData[Math.floor(Math.random() * userData.length)].username
          }
        }
      }
    })
  }
}

main()
  .catch((error) => {
    console.error(error)
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
