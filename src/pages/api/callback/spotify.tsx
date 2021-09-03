import { NextApiRequest, NextApiResponse } from 'next'
import SpotifyWebApi from 'spotify-web-api-node'

import { db } from '~/utils/prisma'
import { resolveSession } from '~/utils/sessions'

const spotify = async (req: NextApiRequest, res: NextApiResponse) => {
  const credentials = {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: 'http://localhost:3000/api/callback/spotify'
  }

  const session = await resolveSession({ req, res })
  const spotifyApi = new SpotifyWebApi(credentials)

  spotifyApi.authorizationCodeGrant(req.query.code as string).then(
    async function (data) {
      await db.integration.updateMany({
        where: { userId: session?.userId },
        data: { spotifyAccessToken: data.body['access_token'] }
      })

      return res.redirect('/')
    },
    function () {
      throw new Error('Something went wrong!')
    }
  )
}

export default spotify
