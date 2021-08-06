import { Profile } from '@prisma/client'

import { builder } from '../builder'

export const ProfileObject = builder.objectRef<Profile>('Profile')

ProfileObject.implement({
  fields: (t) => ({
    id: t.exposeID('id', {}),
    name: t.exposeString('name', {}),
    avatar: t.exposeString('avatar', { nullable: true }),
    bio: t.exposeString('bio', { nullable: true })
  })
})
