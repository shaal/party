import { builder } from '~/graphql/builder'
import { db } from '~/utils/prisma'

builder.prismaObject('Badge', {
  findUnique: (badge) => ({ id: badge.id }),
  fields: (t) => ({
    id: t.exposeID('id', {}),
    slug: t.exposeString('slug', {}),
    name: t.exposeString('name', {}),
    hex: t.exposeString('hex', {}),
    icon: t.exposeString('icon', {})
  })
})

const CreateBadgeInput = builder.inputType('CreateBadgeInput', {
  fields: (t) => ({
    name: t.string({}),
    slug: t.string({}),
    icon: t.string({}),
    hex: t.string({})
  })
})

builder.mutationField('createBadge', (t) =>
  t.prismaField({
    type: 'Badge',
    args: {
      input: t.arg({ type: CreateBadgeInput })
    },
    resolve: async (query, root, { input }) => {
      return await db.badge.create({
        data: {
          name: input.name,
          slug: input.slug,
          icon: input.icon,
          hex: input.hex
        }
      })
    }
  })
)
