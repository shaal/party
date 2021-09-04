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

    spotifyApi.setAccessToken(integration?.spotifyAccessToken as string)
    const response = await spotifyApi.getMyCurrentPlayingTrack()

    return new Spotify(
      response.body.item?.name as string,
      response.body.is_playing
    )
  } catch {
    return null
  }
}
