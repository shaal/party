import { builder } from '~/graphql/builder'
import { db } from '~/utils/prisma'

import { createProduct } from './mutations/createProduct'
import { getProducts } from './queries/getProducts'

builder.prismaObject('Product', {
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

    // Timestamps
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),

    // Relations
    user: t.relation('user'),
    posts: t.relatedConnection('posts', {
      cursor: 'id',
      totalCount: true,
      query: () => ({
        where: { hidden: false },
        orderBy: { createdAt: 'desc' }
      })
    })
  })
})

builder.queryField('products', (t) =>
  t.prismaConnection({
    type: 'Product',
    cursor: 'id',
    defaultSize: 20,
    maxSize: 100,
    resolve: async (query) => {
      return await getProducts(query)
    }
  })
)

const WhereProductInput = builder.inputType('WhereProductInput', {
  fields: (t) => ({
    id: t.id({ required: false }),
    slug: t.string({ required: false })
  })
})

builder.queryField('product', (t) =>
  t.prismaField({
    type: 'Product',
    args: {
      where: t.arg({ type: WhereProductInput })
    },
    resolve: async (query, root, { where }) => {
      return await db.product.findUnique({
        ...query,
        where: { id: where.id!, slug: where.slug! },
        rejectOnNotFound: true
      })
    }
  })
)

const CreateProductInput = builder.inputType('CreateProductInput', {
  fields: (t) => ({
    name: t.string({ validate: { minLength: 1, maxLength: 50 } }),
    slug: t.string({ validate: { minLength: 1, maxLength: 50 } }),
    website: t.string({
      required: false,
      validate: { maxLength: 100, url: true }
    }),
    description: t.string({ required: false, validate: { maxLength: 255 } })
  })
})

builder.mutationField('createProduct', (t) =>
  t.prismaField({
    type: 'Product',
    args: {
      input: t.arg({ type: CreateProductInput })
    },
    resolve: async (query, root, { input }, { session }) => {
      return await createProduct(query, input, session)
    }
  })
)

const EditProductInput = builder.inputType('EditProductInput', {
  fields: (t) => ({
    id: t.id(),
    slug: t.string({
      required: true,
      validate: { minLength: 1, maxLength: 20 }
    }),
    name: t.string({
      required: true,
      validate: { minLength: 1, maxLength: 50 }
    }),
    description: t.string({ required: false, validate: { maxLength: 255 } }),
    avatar: t.string({ required: false })
  })
})

// TODO: Split to function
builder.mutationField('editProduct', (t) =>
  t.prismaField({
    type: 'Product',
    args: {
      input: t.arg({ type: EditProductInput })
    },
    authScopes: { user: true },
    resolve: async (query, root, { input }) => {
      return await db.product.update({
        ...query,
        where: {
          id: input?.id
        },
        data: {
          slug: input.slug,
          name: input.name,
          description: input.description,
          avatar: input.avatar
        }
      })
    }
  })
)
