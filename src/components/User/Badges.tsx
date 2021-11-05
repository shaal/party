import { gql, useQuery } from '@apollo/client'
import { User, UserBadgesQuery } from '@graphql/types.generated'

export const USER_BADGES_QUERY = gql`
  query UserBadges($username: String!) {
    user(username: $username) {
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
  const { loading } = useQuery<UserBadgesQuery>(USER_BADGES_QUERY, {
    variables: { username: user?.username },
    skip: !user?.username
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
