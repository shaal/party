import { md5 } from 'hash-wasm'

import { db } from '../../../utils/prisma'
import { builder } from '../../builder'
import { reservedSlugs } from '../Common/reservedSlugs'

builder.prismaObject(db.product, {
  findUnique: (post) => ({ id: post.id }),
  fields: (t) => ({
    id: t.exposeID('id', {}),
    name: t.exposeString('name', {}),
    slug: t.exposeString('slug', {}),
    description: t.exposeString('description', { nullable: true }),
    avatar: t.exposeString('avatar', { nullable: true }),
    website: t.exposeString('website', { nullable: true }),
    producthunt: t.exposeString('producthunt', { nullable: true }),
    discord: t.exposeString('discord', { nullable: true }),
    github: t.exposeString('github', { nullable: true }),
    twitter: t.exposeString('twitter', { nullable: true }),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
    user: t.relation('user'),
    posts: t.relation('posts')
  })
})

const WhereProductsInput = builder.inputType('WhereProductsInput', {
  fields: (t) => ({
    userId: t.string({
      required: false
    })
  })
})

// TODO: Split to function
builder.queryField('products', (t) =>
  t.prismaConnection({
    type: db.product,
    cursor: 'id',
    args: {
      where: t.arg({ type: WhereProductsInput, required: false })
    },
    resolve: async (query, root, { where }) => {
      return await db.product.findMany({
        ...query,
        where: {
          user: {
            id: where?.userId as string
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
    }
  })
)

builder.queryField('product', (t) =>
  t.prismaField({
    type: db.product,
    args: {
      slug: t.arg.string({})
    },
    resolve: async (query, root, { slug }) => {
      return await db.product.findUnique({
        ...query,
        where: { slug },
        rejectOnNotFound: true
      })
    }
  })
)

const CreateProductInput = builder.inputType('CreateProductInput', {
  fields: (t) => ({
    name: t.string({ validate: { minLength: 1, maxLength: 50 } }),
    slug: t.string({ validate: { minLength: 1, maxLength: 50 } }),
    description: t.string({ required: false, validate: { maxLength: 255 } })
  })
})

// TODO: Split to function
builder.mutationField('createProduct', (t) =>
  t.prismaField({
    type: db.product,
    args: {
      input: t.arg({ type: CreateProductInput })
    },
    resolve: async (query, root, { input }, { session }) => {
      if (reservedSlugs.includes(input.slug)) {
        throw new Error(`Product slug "${input.slug}" is reserved by Devparty.`)
      }

      return await db.product.create({
        data: {
          userId: session!.userId,
          name: input.name,
          slug: input.slug,
          description: input.description,
          avatar: `https://avatar.tobi.sh/${await md5(input.slug)}.svg?text=📦`
        }
      })
    }
  })
)
