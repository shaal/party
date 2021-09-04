import { gql, useQuery } from '@apollo/client'
import { ClockIcon } from '@heroicons/react/outline'
import { Fragment } from 'react'

import { User } from '~/__generated__/schema.generated'
import { Tooltip } from '~/components/ui/Tooltip'

import { Card } from '../../ui/Card'
import { WakatimeIntegrationsQuery } from './__generated__/Wakatime.generated'

const WAKATIME_INTEGRATIONS_QUERY = gql`
  query WakatimeIntegrationsQuery($userId: ID!) {
    wakatime(userId: $userId) {
      hours
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
      skip: !user?.id
    }
  )

  return (
    <Fragment>
      {data?.wakatime?.hours && (
        <Card className="p-3 space-y-1 bg-blue-100 border-blue-300">
          <div className="flex items-center justify-between">
            <div>Hours coded last 30 days</div>
            <Tooltip content="Go to WakaTime">
              <a
                className="font-bold"
                href="https://wakatime.com?utm_source=devparty"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="h-4 w-4"
                  src="/brand/wakatime-dark.svg"
                  alt="Wakatime Logo"
                />
              </a>
            </Tooltip>
          </div>
          <div className="flex items-center space-x-1.5">
            <ClockIcon className="h-4 w-4" />
            <div className="font-bold font-mono">{data?.wakatime?.hours}</div>
          </div>
        </Card>
      )}
    </Fragment>
  )
}

export default Wakatime
