import { gql, useQuery } from '@apollo/client'
import { Fragment } from 'react'

import { User } from '~/__generated__/schema.generated'

import { Card } from '../../ui/Card'
import { SpotifyIntegrationsQuery } from './__generated__/Spotify.generated'

const SPOTIFY_INTEGRATIONS_QUERY = gql`
  query SpotifyIntegrationsQuery($userId: ID!) {
    integration(userId: $userId) {
      spotifyPlaying
    }
  }
`

interface Props {
  user: User
}

const Spotify: React.FC<Props> = ({ user }) => {
  const { data } = useQuery<SpotifyIntegrationsQuery>(
    SPOTIFY_INTEGRATIONS_QUERY,
    {
      variables: {
        userId: user?.id
      },
      skip: !user?.id,
      pollInterval: 10_000
    }
  )

  return (
    <Fragment>
      {data?.integration?.spotifyPlaying && (
        <Card className="p-3 space-y-1 bg-green-100 border-green-300">
          <div>Listening to</div>
          <div className="font-bold font-mono">
            {data?.integration?.spotifyPlaying}
          </div>
        </Card>
      )}
    </Fragment>
  )
}

export default Spotify
