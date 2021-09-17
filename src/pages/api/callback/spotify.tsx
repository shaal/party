import { prisma } from '@utils/prisma'
import { resolveSession } from '@utils/sessions'
import { NextApiRequest, NextApiResponse } from 'next'
import SpotifyWebApi from 'spotify-web-api-node'

const spotify = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await resolveSession({ req, res })
  if (!session) {
    return res.redirect('/login')
  }

  const credentials = {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: `${process.env.BASE_URL}/api/callback/spotify`
  }

  const spotifyApi = new SpotifyWebApi(credentials)

  spotifyApi.authorizationCodeGrant(req.query.code as string).then(
    async function (data) {
      await prisma.integration.updateMany({
        where: { userId: session?.userId },
        data: { spotifyRefreshToken: data.body['refresh_token'] }
      })

      return res.redirect('/settings/integration')
    },
    function () {
      throw new Error('Something went wrong!')
    }
  )
}

export default spotify
