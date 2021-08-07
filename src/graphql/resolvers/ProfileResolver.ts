import { builder } from '../builder'

builder.prismaObject('Profile', {
  findUnique: (profile) => ({ id: profile.id }),
  fields: (t) => ({
    id: t.exposeID('id', {}),
    name: t.exposeString('name', {}),
    avatar: t.exposeString('avatar', { nullable: true }),
    bio: t.exposeString('bio', { nullable: true }),

    // Social
    website: t.exposeString('website', { nullable: true }),
    twitter: t.exposeString('twitter', { nullable: true }),
    github: t.exposeString('github', { nullable: true }),
    discord: t.exposeString('discord', { nullable: true })
  })
})
