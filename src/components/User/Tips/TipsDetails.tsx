import { gql, useQuery } from '@apollo/client'
import { ExternalLinkIcon } from '@heroicons/react/outline'
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
  const tip = data?.user?.tip

  if (loading) return <div className="p-5">Loading dev tips...</div>

  return (
    <div className="p-5">
      <div className="font-bold">
        {tip?.github && (
          <div className="flex items-center space-x-2">
            <img
              className="h-6 w-6"
              src="https://assets.devparty.io/images/tips/github.svg"
              alt="GitHub Sponsors"
            />
            <a
              className="flex items-center space-x-2"
              href={`https://github.com/sponsors/${tip?.github}`}
              target="_blank"
              rel="noreferrer"
            >
              <div>Sponsor on GitHub</div>
              <ExternalLinkIcon className="h-4 w-4" />
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default TipsDetails
