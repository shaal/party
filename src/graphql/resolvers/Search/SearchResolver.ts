import { builder } from '~/graphql/builder'
import { prisma } from '~/utils/prisma'

builder.queryField('searchPosts', (t) =>
  t.prismaConnection({
    type: prisma.post,
    args: {
      keyword: t.arg.string({})
    },
    cursor: 'id',
    resolve: async (query, root, { keyword }) => {
      return await prisma.post.findMany({
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
