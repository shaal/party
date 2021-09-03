import { NextApiRequest, NextApiResponse } from 'next'
import SpotifyWebApi from 'spotify-web-api-node'

const spotify = async (req: NextApiRequest, res: NextApiResponse) => {
  const credentials = {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: 'http://localhost:3000/api/callback/spotify'
  }

  const spotifyApi = new SpotifyWebApi(credentials)
  const code = req.query.code

  spotifyApi.authorizationCodeGrant(code as string).then(
    function (data) {
      spotifyApi.setAccessToken(data.body['access_token'])

      return res.json({ access_token: data.body['access_token'] })
    },
    function () {
      throw new Error('Something went wrong!')
    }
  )
}

export default spotify
