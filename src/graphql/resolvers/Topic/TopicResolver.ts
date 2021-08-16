import { db } from '../../../utils/prisma'
import { builder } from '../../builder'

builder.prismaObject(db.topic, {
  findUnique: (topic) => ({ id: topic.id }),
  fields: (t) => ({
    id: t.exposeID('id', {}),
    name: t.exposeString('name'),
    posts: t.prismaConnection({
      type: db.post,
      cursor: 'id',
      resolve: (query, root) =>
        db.post.findMany({
          ...query,
          where: { topics: { some: { topic: { name: root.name } } } }
        })
    })
  })
})

builder.queryField('topic', (t) =>
  t.prismaField({
    type: db.topic,
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
