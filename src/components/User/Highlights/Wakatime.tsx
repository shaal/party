import { gql, useQuery } from '@apollo/client'
import { Fragment } from 'react'

import { User } from '~/__generated__/schema.generated'

import { Card } from '../../ui/Card'
import { WakatimeIntegrationsQuery } from './__generated__/Wakatime.generated'

const WAKATIME_INTEGRATIONS_QUERY = gql`
  query WakatimeIntegrationsQuery($userId: ID!) {
    integration(userId: $userId) {
      wakatimeActivity
    }
  }
`

interface Props {
  user: User
}

const Wakatime: React.FC<Props> = ({ user }) => {
  const { data } = useQuery<WakatimeIntegrationsQuery>(
    WAKATIME_INTEGRATIONS_QUERY,
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
      {data?.integration?.wakatimeActivity && (
        <Card className="p-3 space-y-1 bg-blue-100 border-blue-300">
          <div>Hours coded last 30 days</div>
          <div className="font-bold font-mono">
            {data?.integration?.wakatimeActivity}
          </div>
        </Card>
      )}
    </Fragment>
  )
}

export default Wakatime
