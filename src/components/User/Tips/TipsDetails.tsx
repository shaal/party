import { gql, useQuery } from '@apollo/client'
import { Button } from '@components/ui/Button'
import AppContext from '@components/utils/AppContext'
import { PencilIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useContext } from 'react'
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
        user {
          id
        }
      }
    }
  }
`

interface SingleTipProps {
  icon: string
  link: string
  text: string
}

const SingleTip: React.FC<SingleTipProps> = ({ icon, link, text }) => (
  <div className="flex cursor-pointer flex-col justify-center items-center text-center dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-200 bg-gray-100 border border-gray-200 dark:border-gray-700 dark:hover:bg-gray-700 rounded-md p-4">
    <img
      className="h-6 w-6"
      src={`https://assets.devparty.io/images/tips/${icon}.svg`}
      alt={text}
    />
    <a
      className="flex items-center space-x-2"
      href={link}
      target="_blank"
      rel="noreferrer"
    >
      <span className="mt-2">{text}</span>
    </a>
  </div>
)

interface Props {
  user: User
}

const TipsDetails: React.FC<Props> = ({ user }) => {
  const { currentUser } = useContext(AppContext)
  const { data, loading } = useQuery<UserTipsQuery>(USER_TIPS_QUERY, {
    variables: { username: user?.username },
    skip: !user?.username
  })
  const tip = data?.user?.tip

  if (loading) return <div className="p-5">Loading dev tips...</div>

  return (
    <div className="p-5">
      <div className="grid gap-4 md:grid-cols-4 grid-cols-2">
        {tip?.cash && (
          <SingleTip
            icon="cash"
            link={`https://cash.app/${tip?.cash}`}
            text="Cash"
          />
        )}
        {tip?.paypal && (
          <SingleTip
            icon="paypal"
            link={`https://paypal.me/${tip?.paypal}`}
            text="PayPal"
          />
        )}
        {tip?.github && (
          <SingleTip
            icon="github"
            link={`https://github.com/sponsors/${tip?.github}`}
            text="Github"
          />
        )}
        {tip?.buymeacoffee && (
          <SingleTip
            icon="buymeacoffee"
            link={`https://www.buymeacoffee.com//${tip?.buymeacoffee}`}
            text="Coffee"
          />
        )}
        {tip?.bitcoin && (
          <SingleTip
            icon="bitcoin"
            link={`https://github.com/sponsors/${tip?.bitcoin}`}
            text="Bitcoin"
          />
        )}
        {tip?.ethereum && (
          <SingleTip
            icon="ethereum"
            link={`https://github.com/sponsors/${tip?.ethereum}`}
            text="Ethereum"
          />
        )}
      </div>
      <div className="font-bold mt-4 flex justify-end">
        {tip?.user?.id === currentUser?.id && (
          <Link href="/settings/tips">
            <a>
              <Button
                className="mt-4 text-sm"
                icon={<PencilIcon className="h-4 w-4" />}
              >
                Edit Tips
              </Button>
            </a>
          </Link>
        )}
      </div>
    </div>
  )
}

export default TipsDetails
