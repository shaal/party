import { builder } from '~/graphql/builder'

import { spotify } from './queries/spotify'

export class Spotify {
  name: string
  isPlaying: boolean
  url: string
  image: string
  artist: string

  constructor(
    name: string,
    isPlaying: boolean,
    url: string,
    image: string,
    artist: string
  ) {
    this.name = name
    this.isPlaying = isPlaying
    this.url = url
    this.image = image
    this.artist = artist
  }
}

export const SpotifyObject = builder.objectRef<Spotify>('Spotify').implement({
  fields: (t) => ({
    name: t.exposeString('name', { nullable: true }),
    isPlaying: t.exposeBoolean('isPlaying', { nullable: true }),
    url: t.exposeString('url', { nullable: true }),
    image: t.exposeString('image', { nullable: true }),
    artist: t.exposeString('artist', { nullable: true })
  })
})

builder.queryField('spotify', (t) =>
  t.field({
    type: SpotifyObject,
    args: { userId: t.arg.id() },
    nullable: true,
    resolve: async (root, { userId }) => {
      return await spotify(userId)
    }
  })
)
