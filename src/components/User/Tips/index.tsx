import { gql, useQuery } from '@apollo/client'
import { Button } from '@components/ui/Button'
import { CashIcon } from '@heroicons/react/outline'
import { User } from 'src/__generated__/schema.generated'

import { UserTipsQuery } from './__generated__/index.generated'

export const USER_TIPS_QUERY = gql`
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

const Tips: React.FC<Props> = ({ user }) => {
  const { data, loading } = useQuery<UserTipsQuery>(USER_TIPS_QUERY, {
    variables: { username: user?.username },
    skip: !user?.username
  })

  if (loading) return null

  return (
    <>
      <Button
        className="text-sm"
        icon={<CashIcon className="h-4 w-4" />}
        outline
      >
        Tip
      </Button>
    </>
  )
}

export default Tips
