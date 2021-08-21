import { prisma } from '@utils/prisma'

import { builder } from '../../builder'
import { modTopic } from './mutations/modTopic'

builder.prismaObject(prisma.topic, {
  findUnique: (topic) => ({ id: topic.id }),
  fields: (t) => ({
    id: t.exposeID('id', {}),
    name: t.exposeString('name'),
    image: t.exposeString('image', { nullable: true }),
    description: t.exposeString('description', { nullable: true }),
    postsCount: t.field({
      type: 'Int',
      resolve: (root) =>
        prisma.post.count({
          where: { topics: { some: { topic: { name: root.name } } } }
        })
    }),
    posts: t.prismaConnection({
      type: prisma.post,
      cursor: 'id',
      resolve: (query, root) =>
        prisma.post.findMany({
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
    type: prisma.topic,
    args: {
      name: t.arg.string({})
    },
    resolve: async (query, root, { name }) => {
      return await prisma.topic.findUnique({
        ...query,
        where: { name },
        rejectOnNotFound: true
      })
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
    type: prisma.topic,
    args: {
      input: t.arg({ type: EditTopicInput })
    },
    nullable: true,
    resolve: async (query, root, { input }, { session }) => {
      return await modTopic(query, input, session)
    }
  })
)
