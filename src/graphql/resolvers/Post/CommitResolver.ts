import { builder } from '@graphql/builder'

builder.prismaObject('PostCommit', {
  findUnique: (commit) => ({ id: commit.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    repoSlug: t.exposeString('repoSlug', { nullable: true }),
    message: t.exposeString('message', { nullable: true }),
    url: t.exposeString('url', { nullable: true }),
    verified: t.exposeBoolean('verified', { nullable: true }),
    additions: t.exposeInt('additions', { nullable: true }),
    deletions: t.exposeInt('deletions', { nullable: true }),
    authorUsername: t.exposeString('authorUsername', { nullable: true }),
    authorAvatar: t.exposeString('authorAvatar', { nullable: true }),

    // Relations
    post: t.relation('post')
  })
})
