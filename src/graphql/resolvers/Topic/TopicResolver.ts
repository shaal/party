import { builder } from '~/graphql/builder'
import { db } from '~/utils/prisma'

import { modTopic } from './mutations/modTopic'
import { toggleStar } from './mutations/toggleStar'
import { hasStarted } from './queries/hasStarted'

builder.prismaObject('Topic', {
  findUnique: (topic) => ({ id: topic.id }),
  fields: (t) => ({
    id: t.exposeID('id', {}),
    name: t.exposeString('name'),
    image: t.exposeString('image', { nullable: true }),
    description: t.exposeString('description', { nullable: true }),
    hasStarted: t.field({
      type: 'Boolean',
      resolve: async (root, args, { session }) => {
        if (!session) return false
        return await hasStarted(session?.userId as string, root.id)
      }
    }),

    // Count
    postsCount: t.relationCount('posts'),

    // Relations
    users: t.relatedConnection('users', { cursor: 'id' }),
    posts: t.prismaConnection({
      type: 'Post',
      cursor: 'id',
      defaultSize: 20,
      maxSize: 100,
      resolve: (query, root) =>
        db.post.findMany({
          ...query,
          where: { topics: { some: { topic: { name: root.name } } } },
          orderBy: {
            createdAt: 'desc'
          }
        })
    })
  })
})

builder.queryField('topic', (t) =>
  t.prismaField({
    type: 'Topic',
    args: {
      name: t.arg.string({})
    },
    resolve: async (query, root, { name }) => {
      return await db.topic.findUnique({
        ...query,
        where: { name },
        rejectOnNotFound: true
      })
    }
  })
)

const ToggleTopicStarInput = builder.inputType('ToggleTopicStarInput', {
  fields: (t) => ({
    topicId: t.id({})
  })
})

builder.mutationField('toggleTopicStar', (t) =>
  t.prismaField({
    type: 'Topic',
    args: {
      input: t.arg({ type: ToggleTopicStarInput })
    },
    nullable: true,
    resolve: async (query, root, { input }, { session }) => {
      return await toggleStar(session?.userId as string, input.topicId)
    }
  })
)

const EditTopicInput = builder.inputType('EditTopicInput', {
  fields: (t) => ({
    id: t.id({}),
    description: t.string({ required: false })
  })
})

builder.mutationField('modTopic', (t) =>
  t.prismaField({
    type: 'Topic',
    args: {
      input: t.arg({ type: EditTopicInput })
    },
    nullable: true,
    resolve: async (query, root, { input }, { session }) => {
      return await modTopic(query, input, session)
    }
  })
)
