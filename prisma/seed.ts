import 'tsconfig-paths/register'

import { getRandomCover } from '@graphql/utils/getRandomCover'
import { PrismaClient } from '@prisma/client'
import { hashPassword } from '@utils/auth'
import faker from 'faker'
import { md5 } from 'hash-wasm'

import { communityData, rulesData } from './seeds/communities'
import { productData } from './seeds/products'
import { userData } from './seeds/user'

const hplipsum = require('hplipsum')
const db = new PrismaClient()

async function main() {
  await db.topic.deleteMany()
  console.log('All topics have been deleted 🗑️')
  await db.postTopic.deleteMany()
  console.log('All post topics have been deleted 🗑️')
  await db.like.deleteMany()
  console.log('All likes have been deleted 🗑️')
  await db.post.deleteMany()
  console.log('All posts have been deleted 🗑️')
  await db.product.deleteMany()
  console.log('All products have been deleted 🗑️')
  await db.notification.deleteMany()
  console.log('All notifications have been deleted 🗑️')
  await db.session.deleteMany()
  console.log('All sessions have been deleted 🗑️')
  await db.integration.deleteMany()
  console.log('All integrations have been deleted 🗑️')
  await db.profile.deleteMany()
  console.log('All profiles have been deleted 🗑️')
  await db.invite.deleteMany()
  console.log('All invites have been deleted 🗑️')
  await db.user.deleteMany()
  console.log('All users have been deleted 🗑️')
  await db.community.deleteMany()
  console.log('All communities have been deleted 🗑️')

  // Fake User
  for (let i = 0; i < 50; i++) {
    const username =
      `${faker.name.firstName()}${faker.name.lastName()}`.toLocaleLowerCase()
    console.log(`Seeding Fake User - @${username} 👨‍🎤`)
    await db.user.create({
      data: {
        email: `${username}@yogi.codes`,
        username,
        inWaitlist: false,
        hashedPassword: await hashPassword(username),
        profile: {
          create: {
            name: faker.name.firstName(),
            avatar: faker.internet.avatar(),
            cover: getRandomCover().image,
            coverBg: getRandomCover().color,
            bio: faker.commerce.productDescription()
          }
        },
        posts: { create: { body: faker.lorem.sentence(20) } }
      }
    })
  }

  // Real User
  for (const user of userData) {
    console.log(`Seeding Real User - @${user.username} 👨‍🎤`)
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
            cover: getRandomCover().image,
            coverBg: getRandomCover().color,
            bio: user.bio
          }
        },
        integrations: { create: { ethAddress: user.ethAddress } }
      }
    })
  }

  // Fake Products
  for (let i = 0; i < 20; i++) {
    const slug =
      `${faker.name.firstName()}${faker.name.lastName()}`.toLocaleLowerCase()
    console.log(`Seeding Fake Product - @${slug} 📦`)
    await db.product.create({
      data: {
        slug,
        name: faker.company.companyName(),
        avatar: `https://avatar.tobi.sh/${await md5(slug)}.svg?text=📦`,
        description: faker.lorem.sentence(10),
        owner: { connect: { username: 'yoginth' } }
      }
    })
  }

  // Product
  for (const product of productData) {
    console.log(`Seeding Real Product - #${product.slug} 📦`)
    await db.product.create({
      data: {
        name: product.name,
        slug: product.slug,
        avatar: product.avatar,
        description: product.description,
        owner: { connect: { username: product.username } }
      }
    })
  }

  // Community
  for (const community of communityData) {
    console.log(`Seeding Community - ${community.slug} 🎭`)
    await db.community.create({
      data: {
        name: community.name,
        slug: community.slug,
        avatar: `https://avatar.tobi.sh/${await md5(
          community.slug
        )}.svg?text=🎭`,
        description: community.description,
        owner: { connect: { username: community.username } },
        members: { connect: { username: 'yoginth' } },
        moderators: { connect: { username: 'yoginth' } },
        rules: { createMany: { data: rulesData } }
      }
    })
  }

  // Post
  for (let i = 0; i < 200; i++) {
    const post = hplipsum(10)
    const done = faker.datatype.boolean()
    console.log(`Seeding Post - ${post} 📜`)
    await db.post.create({
      data: {
        body: post,
        done,
        type: done ? 'TASK' : 'POST',
        // TODO: Add attachments
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
