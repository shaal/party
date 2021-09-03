import { gql, useQuery } from '@apollo/client'

import { User } from '~/__generated__/schema.generated'

import { Card } from '../ui/Card'
import { IntegrationsQuery } from './__generated__/Highlights.generated'

const INTEGRATIONS_QUERY = gql`
  query IntegrationsQuery($userId: ID!) {
    integration(userId: $userId) {
      wakatimeActivity
      spotifyPlaying
    }
  }
`

interface Props {
  user: User
}

const Highlights: React.FC<Props> = ({ user }) => {
  const { data } = useQuery<IntegrationsQuery>(INTEGRATIONS_QUERY, {
    variables: {
      userId: user?.id
    },
    skip: !user?.id,
    pollInterval: 10_000
  })

  return (
    <div className="space-y-2">
      {data?.integration?.wakatimeActivity && (
        <Card className="p-3 space-y-1 bg-blue-100 border-blue-300">
          <div>Hours coded last 30 days</div>
          <div className="font-bold font-mono">
            {data?.integration?.wakatimeActivity}
          </div>
        </Card>
      )}
      {data?.integration?.spotifyPlaying && (
        <Card className="p-3 space-y-1 bg-green-100 border-green-300">
          <div>Listening to</div>
          <div className="font-bold font-mono">
            {data?.integration?.spotifyPlaying}
          </div>
        </Card>
      )}
    </div>
  )
}

export default Highlights
