import SpotifyWebApi from 'spotify-web-api-node'

import { db } from '~/utils/prisma'

import { Spotify } from '../SpotifyResolver'

export const spotify = async (userId: string) => {
  try {
    const credentials = {
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      redirectUri: `http://localhost:3000/api/callback/spotify`
    }

    const spotifyApi = new SpotifyWebApi(credentials)
    const integration = await db.integration.findFirst({ where: { userId } })

    spotifyApi.setAccessToken(integration?.spotifyRefreshToken as string)
    const { body } = await spotifyApi.getMyCurrentPlayingTrack()
    const item = body.item as SpotifyApi.TrackObjectFull

    return new Spotify(
      item?.name as string,
      body.is_playing,
      item?.external_urls?.spotify as string,
      item.album.images[0].url,
      item.artists[0].name
    )
  } catch {
    return null
  }
}
