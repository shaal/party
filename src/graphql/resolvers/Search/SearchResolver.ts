import { builder } from '~/graphql/builder'
import { db } from '~/utils/prisma'

builder.queryField('searchPosts', (t) =>
  t.prismaConnection({
    type: db.post,
    args: {
      keyword: t.arg.string({})
    },
    cursor: 'id',
    resolve: async (query, root, { keyword }) => {
      return await db.post.findMany({
        ...query,
        where: {
          body: {
            contains: keyword
          }
        }
      })
    }
  })
)

builder.queryField('searchUsers', (t) =>
  t.prismaConnection({
    type: db.user,
    args: {
      keyword: t.arg.string({})
    },
    cursor: 'id',
    resolve: async (query, root, { keyword }) => {
      return await db.user.findMany({
        ...query,
        where: {
          username: {
            contains: keyword
          }
        }
      })
    }
  })
)

builder.queryField('searchProduct', (t) =>
  t.prismaConnection({
    type: db.product,
    args: {
      keyword: t.arg.string({})
    },
    cursor: 'id',
    resolve: async (query, root, { keyword }) => {
      return await db.product.findMany({
        ...query,
        where: {
          slug: {
            contains: keyword
          }
        }
      })
    }
  })
)