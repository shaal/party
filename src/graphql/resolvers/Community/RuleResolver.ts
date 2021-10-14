import { builder } from '@graphql/builder'

builder.prismaObject('Rule', {
  findUnique: (rule) => ({ id: rule.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    index: t.exposeInt('index'),
    name: t.exposeString('name'),
    description: t.exposeString('description', { nullable: true }),

    // Relations
    community: t.relation('community')
  })
})
