import SpotifyWebApi from 'spotify-web-api-node'

import { db } from '~/utils/prisma'

export const spotify = async (id: string) => {
  try {
    const credentials = {
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      redirectUri: `http://localhost:3000/api/callback/spotify`
    }

    const spotifyApi = new SpotifyWebApi(credentials)
    const integration = await db.integration.findFirst({
      where: { id }
    })

    spotifyApi.setAccessToken(integration?.spotifyAccessToken as string)
    spotifyApi.getMyCurrentPlayingTrack({}, (err: any, data: any) => {
      if (err) {
        throw new Error('Something went wrong!')
      } else {
        console.log(data.body.item?.name)
        return data.body.item?.name
      }
    })
  } catch {
    throw new Error('Something went wrong!')
  }
}
