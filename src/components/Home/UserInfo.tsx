import { gql } from '@apollo/client'
import { User } from '~/__generated__/schema.generated'
import { Button } from '../ui/Button'
import { Link } from '../ui/Link'

export const UserInfoFragment = gql`
  fragment UserInfo_user on User {
    id
    name
  }
`

interface Props {
  user: User
}

export function UserInfo({ user }: Props) {
  return (
    <>
      <h3 className="text-center font-bold text-xl">Welcome, {user.name}!</h3>
      <Button href="/posts">View Your Posts</Button>
      <div className="grid grid-cols-2 gap-2 text-center">
        <Link href="/settings">Edit Profile</Link>
      </div>
    </>
  )
}
