import { gql, useQuery } from '@apollo/client'
import { Card } from '@components/ui/Card'
import { Tooltip } from '@components/ui/Tooltip'
import { imagekitURL } from '@components/utils/imagekitURL'
import { User } from 'src/__generated__/schema.generated'
import { STATIC_ASSETS } from 'src/constants'

import { SpotifyIntegrationsQuery } from './__generated__/Spotify.generated'

const SPOTIFY_INTEGRATIONS_QUERY = gql`
  query SpotifyIntegrationsQuery($userId: ID!) {
    spotify(userId: $userId) {
      name
      isPlaying
      image
      url
      artist
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
      pollInterval: 10000
    }
  )
  const spotify = data?.spotify

  return (
    <>
      {spotify?.isPlaying && (
        <Card className="p-3 space-y-1 !bg-green-100 border-green-300">
          <div className="flex items-center justify-between">
            <div>Listening to Spotify</div>
            <Tooltip content="Go to Spotify">
              <a
                className="font-bold"
                href={`${spotify?.url as string}?utm_source=devparty`}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="h-4 w-4"
                  src={`${STATIC_ASSETS}/brands/spotify.svg`}
                  alt="Spotify Logo"
                />
              </a>
            </Tooltip>
          </div>
          <div className="flex items-center space-x-2 pt-1">
            <img
              src={imagekitURL(spotify.image as string, 200, 200)}
              className="h-16 w-16 rounded-lg"
              alt={spotify.name as string}
            />
            <div>
              <a
                className="font-bold"
                href={`${spotify?.url as string}?utm_source=devparty`}
                target="_blank"
                rel="noreferrer"
              >
                {spotify?.name}
              </a>
              <div className="text-sm">by {spotify?.artist}</div>
            </div>
          </div>
        </Card>
      )}
    </>
  )
}

export default Spotify
