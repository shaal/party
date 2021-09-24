import { gql, useQuery } from '@apollo/client'
import { User } from 'src/__generated__/schema.generated'

import { UserTipsQuery } from './__generated__/TipsDetails.generated'

const USER_TIPS_QUERY = gql`
  query UserTipsQuery($username: String!) {
    user(username: $username) {
      id
      tip {
        id
        cash
        paypal
        github
        buymeacoffee
        bitcoin
        ethereum
      }
    }
  }
`

interface Props {
  user: User
}

const TipsDetails: React.FC<Props> = ({ user }) => {
  const { data, loading } = useQuery<UserTipsQuery>(USER_TIPS_QUERY, {
    variables: { username: user?.username },
    skip: !user?.username
  })

  if (loading) return <div className="p-5">Loading dev tips...</div>

  return (
    <div className="p-5">
      <div className="font-bold">TBD</div>
    </div>
  )
}

export default TipsDetails
