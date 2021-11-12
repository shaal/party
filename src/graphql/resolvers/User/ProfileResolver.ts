import { builder } from '@graphql/builder'
import { db } from '@utils/prisma'

import { createLog } from '../Log/mutations/createLog'

builder.prismaObject('Profile', {
  findUnique: (profile) => ({ id: profile.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    bio: t.exposeString('bio', { nullable: true }),
    location: t.exposeString('location', { nullable: true }),
    avatar: t.exposeString('avatar'),
    nftSource: t.exposeString('nftSource', { nullable: true }),
    cover: t.exposeString('cover'),
    coverBg: t.exposeString('coverBg'),
    readme: t.exposeString('readme', { nullable: true }),

    // Social
    website: t.exposeString('website', { nullable: true }),
    twitter: t.exposeString('twitter', { nullable: true }),
    github: t.exposeString('github', { nullable: true }),
    discord: t.exposeString('discord', { nullable: true })
  })
})

const EditUserSocialInput = builder.inputType('EditUserSocialInput', {
  fields: (t) => ({
    website: t.string({
      required: false,
      validate: { maxLength: 100, url: true }
    }),
    twitter: t.string({ required: false, validate: { maxLength: 50 } }),
    github: t.string({ required: false, validate: { maxLength: 50 } }),
    discord: t.string({ required: false, validate: { maxLength: 50 } })
  })
})

builder.mutationField('editUserSocial', (t) =>
  t.prismaField({
    type: 'User',
    args: { input: t.arg({ type: EditUserSocialInput }) },
    resolve: async (query, parent, { input }, { session }) => {
      const user = await db.user.update({
        ...query,
        where: {
          id: session!.userId
        },
        data: {
          profile: {
            update: {
              website: input.website,
              twitter: input.twitter,
              github: input.github,
              discord: input.discord
            }
          }
        }
      })
      createLog(session!.userId, user?.id, 'SETTINGS_UPDATE')

      return user
    }
  })
)
