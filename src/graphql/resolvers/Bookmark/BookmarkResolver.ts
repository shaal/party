import { builder } from '@graphql/builder'

import { getBookmarks } from './queries/getBookmarks'

builder.prismaObject('Bookmark', {
  findUnique: (bookmark) => ({ id: bookmark.id }),
  fields: (t) => ({
    id: t.exposeID('id'),

    // Relations
    user: t.relation('user'),
    post: t.relation('post')
  })
})

builder.queryField('bookmarks', (t) =>
  t.prismaConnection({
    type: 'Bookmark',
    cursor: 'id',
    defaultSize: 20,
    maxSize: 100,
    authScopes: { user: true, $granted: 'currentUser' },
    resolve: async (query) => {
      return await getBookmarks(query)
    }
  })
)
