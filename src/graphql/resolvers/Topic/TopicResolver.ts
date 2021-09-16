import { builder } from 'src/graphql/builder'
import { db } from '@utils/prisma'

import { modTopic } from './mutations/modTopic'
import { toggleStar } from './mutations/toggleStar'
import { hasStarted } from './queries/hasStarted'

builder.prismaObject('Topic', {
  findUnique: (topic) => ({ id: topic.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    image: t.exposeString('image', { nullable: true }),
    description: t.exposeString('description', { nullable: true }),
    hasStarted: t.field({
      type: 'Boolean',
      resolve: async (parent, args, { session }) => {
        if (!session) return false
        return await hasStarted(session?.userId as string, parent.id)
      }
    }),
    postsCount: t.relationCount('posts'),

    // Relations
    users: t.relatedConnection('users', { cursor: 'id' }),
    posts: t.prismaConnection({
      type: 'Post',
      cursor: 'id',
      defaultSize: 20,
      maxSize: 100,
      resolve: (query, parent) =>
        db.post.findMany({
          ...query,
          where: {
            topics: { some: { topic: { name: parent.name } } },
            hidden: false
          },
          orderBy: { createdAt: 'desc' }
        })
    })
  })
})

builder.queryField('topic', (t) =>
  t.prismaField({
    type: 'Topic',
    args: { name: t.arg.string() },
    resolve: async (query, parent, { name }) => {
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
    id: t.id()
  })
})

builder.mutationField('toggleTopicStar', (t) =>
  t.prismaField({
    type: 'Topic',
    args: { input: t.arg({ type: ToggleTopicStarInput }) },
    nullable: true,
    resolve: async (query, parent, { input }, { session }) => {
      return await toggleStar(session?.userId as string, input.id)
    }
  })
)

const EditTopicInput = builder.inputType('EditTopicInput', {
  fields: (t) => ({
    id: t.id(),
    description: t.string({ required: false })
  })
})

builder.mutationField('modTopic', (t) =>
  t.prismaField({
    type: 'Topic',
    args: { input: t.arg({ type: EditTopicInput }) },
    nullable: true,
    resolve: async (query, parent, { input }, { session }) => {
      return await modTopic(query, input, session)
    }
  })
)
