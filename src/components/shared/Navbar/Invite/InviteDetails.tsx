import { gql, useQuery } from '@apollo/client'

import { InviteCodeQuery } from './__generated__/InviteDetails.generated'

export const INVITE_CODE_QUERY = gql`
  query InviteCodeQuery {
    me {
      invite {
        id
        code
        usedTimes
      }
    }
  }
`

const InviteDetails: React.FC = () => {
  const { data, loading } = useQuery<InviteCodeQuery>(INVITE_CODE_QUERY)

  if (loading) return <div>Loading Invite Code...</div>

  return (
    <div>
      <div>{data?.me?.invite?.code}</div>
    </div>
  )
}

export default InviteDetails
