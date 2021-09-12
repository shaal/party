import { builder } from '~/graphql/builder'
import { db } from '~/utils/prisma'

import { getBadges } from './queries/getBadges'

builder.prismaObject('Badge', {
  findUnique: (badge) => ({ id: badge.id }),
  fields: (t) => ({
    id: t.exposeID('id', {}),
    slug: t.exposeString('slug', {}),
    name: t.exposeString('name', {}),
    hex: t.exposeString('hex', {}),
    icon: t.exposeString('icon', {}),

    // Relations
    users: t.relatedConnection('users', { cursor: 'id', totalCount: true })
  })
})

builder.queryField('badges', (t) =>
  t.prismaConnection({
    type: 'Badge',
    cursor: 'id',
    defaultSize: 20,
    maxSize: 100,
    resolve: async (query) => {
      return await getBadges(query)
    }
  })
)

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

const AttachBadgeToUserInput = builder.inputType('AttachBadgeToUserInput', {
  fields: (t) => ({
    userId: t.id({}),
    badgeId: t.id({})
  })
})

builder.mutationField('attachBadge', (t) =>
  t.prismaField({
    type: 'User',
    args: {
      input: t.arg({ type: AttachBadgeToUserInput })
    },
    resolve: async (query, root, { input }) => {
      return await db.user.update({
        ...query,
        where: { id: input.userId },
        data: {
          badges: {
            connect: { id: input.badgeId }
          }
        }
      })
    }
  })
)
