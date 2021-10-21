import { builder } from '@graphql/builder'

builder.prismaObject('Attachment', {
  findUnique: (attachment) => ({ id: attachment.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    index: t.exposeInt('index'),
    type: t.exposeString('type'),
    url: t.exposeString('url')
  })
})
