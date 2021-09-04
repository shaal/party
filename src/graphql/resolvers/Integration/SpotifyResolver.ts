import { builder } from '~/graphql/builder'

import { spotify } from './queries/spotify'

export class Spotify {
  name: string
  isPlaying: boolean

  constructor(name: string, isPlaying: boolean) {
    this.name = name
    this.isPlaying = isPlaying
  }
}

export const SpotifyObject = builder.objectRef<Spotify>('Spotify').implement({
  fields: (t) => ({
    name: t.exposeString('name', { nullable: true }),
    isPlaying: t.exposeBoolean('isPlaying', { nullable: true })
  })
})

builder.queryField('spotify', (t) =>
  t.field({
    type: SpotifyObject,
    args: { userId: t.arg.id({}) },
    nullable: true,
    resolve: async (root, { userId }) => {
      return await spotify(userId)
    }
  })
)
