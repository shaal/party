import { builder } from '@graphql/builder'
import { db } from '@utils/prisma'

import { createCommunity } from './mutations/createCommunity'
import { toggleJoin } from './mutations/toggleJoin'
import { hasJoined } from './queries/hasJoined'

builder.prismaObject('Community', {
  findUnique: (community) => ({ id: community.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    slug: t.exposeString('slug'),
    description: t.exposeString('description', { nullable: true }),
    avatar: t.exposeString('avatar', { nullable: true }),
    hasJoined: t.field({
      type: 'Boolean',
      resolve: async (parent, args, { session }) => {
        if (!session) return false
        return await hasJoined(session?.userId as string, parent.id)
      }
    }),

    // Timestamps
    createdAt: t.expose('createdAt', { type: 'DateTime' }),

    // Relations
    owner: t.relation('owner'),
    members: t.relatedConnection('members', {
      cursor: 'id',
      totalCount: true,
      query: () => ({
        where: { spammy: false }
      })
    }),
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

builder.queryField('community', (t) =>
  t.prismaField({
    type: 'Community',
    args: { slug: t.arg.string() },
    resolve: async (query, parent, { slug }) => {
      return await db.community.findUnique({
        ...query,
        where: { slug },
        rejectOnNotFound: true
      })
    }
  })
)

const CreateCommunityInput = builder.inputType('CreateCommunityInput', {
  fields: (t) => ({
    name: t.string({ validate: { minLength: 2, maxLength: 50 } }),
    slug: t.string({ validate: { minLength: 2, maxLength: 50 } }),
    description: t.string({ required: false, validate: { maxLength: 190 } })
  })
})

builder.mutationField('createCommunity', (t) =>
  t.prismaField({
    type: 'Community',
    args: { input: t.arg({ type: CreateCommunityInput }) },
    resolve: async (query, parent, { input }, { session }) => {
      return await createCommunity(query, input, session)
    }
  })
)

const ToggleCommunityJoinInput = builder.inputType('ToggleCommunityJoinInput', {
  fields: (t) => ({
    id: t.id()
  })
})

builder.mutationField('toggleCommunityJoin', (t) =>
  t.prismaField({
    type: 'Community',
    args: { input: t.arg({ type: ToggleCommunityJoinInput }) },
    nullable: true,
    resolve: async (query, parent, { input }, { session }) => {
      return await toggleJoin(session?.userId as string, input.id)
    }
  })
)
