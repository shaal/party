import { gql, useQuery } from '@apollo/client'

import { User } from '~/__generated__/schema.generated'

import { Card } from '../ui/Card'
import { WakatimeQuery } from './__generated__/Highlights.generated'

export const WAKATIME_QUERY = gql`
  query WakatimeQuery($userId: ID!) {
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
  const { data } = useQuery<WakatimeQuery>(WAKATIME_QUERY, {
    variables: {
      userId: user?.id
    },
    skip: !user?.id
  })

  return (
    <div className="space-y-2 pt-2">
      {data?.integration?.hasWakatime && (
        <Card className="p-3 space-y-1">
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
