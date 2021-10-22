import { builder } from '@graphql/builder'

builder.prismaObject('Bookmark', {
  findUnique: (bookmark) => ({ id: bookmark.id }),
  fields: (t) => ({
    id: t.exposeID('id'),

    // Relations
    user: t.relation('user'),
    post: t.relation('post')
  })
})
