import { gql, useQuery } from '@apollo/client'

import { User } from '~/__generated__/schema.generated'

import { UserBadgesQuery } from './__generated__/Badges.generated'

export const USER_BADGES_QUERY = gql`
  query UserBadgesQuery($id: ID) {
    user(id: $id) {
      id
      badges {
        edges {
          node {
            id
            name
            description
            image
          }
        }
      }
    }
  }
`

interface Props {
  user: User
}

const Badges: React.FC<Props> = ({ user }) => {
  const { data, loading } = useQuery<UserBadgesQuery>(USER_BADGES_QUERY, {
    variables: {
      id: user?.id
    },
    skip: !user?.id
  })

  if (loading) return null

  return (
    <div className="space-y-2">
      <div className="font-bold">Badges</div>
      <div>TBD</div>
    </div>
  )
}

export default Badges
