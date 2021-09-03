import { gql, useQuery } from '@apollo/client'

import { User } from '~/__generated__/schema.generated'

import { Card } from '../ui/Card'
import { IntegrationsQuery } from './__generated__/Highlights.generated'

const INTEGRATIONS_QUERY = gql`
  query IntegrationsQuery($userId: ID!) {
    integration(userId: $userId) {
      hasWakatime
      wakatimeActivity
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
    skip: !user?.id
  })

  return (
    <div className="space-y-2">
      {data?.integration?.hasWakatime && data?.integration?.wakatimeActivity && (
        <Card className="p-3 space-y-1 border-2 border-dashed bg-blue-100 border-blue-300">
          <div>Hours coded last 30 days</div>
          <div className="font-bold font-mono">
            {data?.integration?.wakatimeActivity}
          </div>
        </Card>
      )}
    </div>
  )
}

export default Highlights
