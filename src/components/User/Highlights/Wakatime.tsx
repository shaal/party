import { gql, useQuery } from '@apollo/client'
import { Card } from '@components/UI/Card'
import { Tooltip } from '@components/UI/Tooltip'
import { User, WakatimeIntegrationsQuery } from '@graphql/types.generated'
import { ClockIcon } from '@heroicons/react/outline'
import { STATIC_ASSETS } from 'src/constants'

const WAKATIME_INTEGRATIONS_QUERY = gql`
  query WakatimeIntegrations($userId: ID!) {
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
  const wakatime = data?.wakatime

  return (
    <>
      {wakatime?.hours && (
        <Card
          className="p-3 space-y-1 !bg-blue-100 border-blue-300"
          forceRounded
        >
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
                  src={`${STATIC_ASSETS}/brands/wakatime-dark.svg`}
                  alt="Wakatime Logo"
                />
              </a>
            </Tooltip>
          </div>
          <div className="flex items-center space-x-1.5">
            <ClockIcon className="h-4 w-4" />
            <div className="font-bold font-mono">{wakatime?.hours}</div>
          </div>
        </Card>
      )}
    </>
  )
}

export default Wakatime
