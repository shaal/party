import 'tsconfig-paths/register'

import { PrismaClient } from '@prisma/client'
import { hashPassword } from '@utils/auth'
import faker from 'faker'
import { md5 } from 'hash-wasm'

import { productData } from './seeds/products'
import { userData } from './seeds/user'
const hplipsum = require('hplipsum')
const db = new PrismaClient()

async function main() {
  // Fake User
  for (let i = 0; i < 50; i++) {
    const username =
      `${faker.name.firstName()}${faker.name.lastName()}`.toLocaleLowerCase()
    console.log(`Seeding User - @${username} ✅`)
    await db.user.create({
      data: {
        email: `yoginth+${username}@hey.com`,
        username,
        inWaitlist: false,
        hashedPassword: await hashPassword(username),
        profile: {
          create: {
            name: faker.name.firstName(),
            avatar: faker.internet.avatar(),
            bio: faker.commerce.productDescription()
          }
        },
        invite: {
          create: {
            code: await (await md5(faker.internet.email() + Math.random()))
              .slice(0, 12)
              .toLowerCase()
          }
        },
        integrations: { create: {} },
        posts: {
          create: {
            body: faker.lorem.sentence(20)
          }
        }
      }
    })
  }

  // Real User
  for (const user of userData) {
    console.log(`Seeding User - @${user.username} ✅`)
    await db.user.create({
      data: {
        email: user.email,
        username: user.username,
        isStaff: user.isStaff,
        inWaitlist: false,
        hashedPassword: await hashPassword(user.username),
        profile: {
          create: {
            name: user.name,
            avatar: user.avatar,
            bio: user.bio
          }
        },
        invite: {
          create: {
            code: await (await md5(user.email + Math.random()))
              .slice(0, 12)
              .toLowerCase()
          }
        },
        integrations: { create: {} }
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
    const post = hplipsum(10)
    const done = faker.datatype.boolean()
    console.log(`Seeding Post - ${post} ✅`)
    await db.post.create({
      data: {
        body: post,
        done,
        type: done ? 'TASK' : 'POST',
        attachments:
          faker.datatype.boolean() &&
          JSON.stringify([
            {
              type: 'image/png',
              url: `https://placeimg.com/800/480/nature/${faker.datatype.uuid()}`
            },
            {
              type: 'image/png',
              url: `https://placeimg.com/800/480/nature/${faker.datatype.uuid()}`
            },
            {
              type: 'image/png',
              url: `https://placeimg.com/800/480/nature/${faker.datatype.uuid()}`
            },
            {
              type: 'image/png',
              url: `https://placeimg.com/800/480/nature/${faker.datatype.uuid()}`
            }
          ]),
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
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
