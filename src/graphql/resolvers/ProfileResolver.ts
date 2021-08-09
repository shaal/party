import { db } from '~/utils/prisma'

import { builder } from '../builder'

builder.prismaObject('Profile', {
  findUnique: (profile) => ({ id: profile.id }),
  fields: (t) => ({
    id: t.exposeID('id', {}),
    name: t.exposeString('name', {}),
    bio: t.exposeString('bio', { nullable: true }),
    location: t.exposeString('location', { nullable: true }),
    avatar: t.exposeString('avatar', { nullable: true }),
    cover: t.exposeString('cover', { nullable: true }),

    // Social
    website: t.exposeString('website', { nullable: true }),
    twitter: t.exposeString('twitter', { nullable: true }),
    github: t.exposeString('github', { nullable: true }),
    discord: t.exposeString('discord', { nullable: true })
  })
})

const EditProfileInput = builder.inputType('EditProfileInput', {
  fields: (t) => ({
    name: t.string({
      required: true,
      validate: {
        minLength: 1,
        maxLength: 50
      }
    })
  })
})

builder.mutationField('editProfile', (t) =>
  t.prismaField({
    type: 'User',
    args: {
      input: t.arg({ type: EditProfileInput })
    },
    resolve: (query, root, { input }, { session }) => {
      return db.user.update({
        ...query,
        where: {
          id: session!.userId
        },
        data: {
          profile: {
            update: {
              name: input.name ?? undefined
            }
          }
        }
      })
    }
  })
)
