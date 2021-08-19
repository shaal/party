import React, { useContext } from 'react'

import { User } from '../../__generated__/schema.generated'
import { Card, CardBody } from '../ui/Card'
import Follow from '../User/Follow'
import AppContext from '../utils/AppContext'
import UserProfile from './UserProfile'

interface Props {
  user: User
}

const UserCard: React.FC<Props> = ({ user }) => {
  const { currentUser } = useContext(AppContext)

  return (
    <Card>
      <CardBody className="space-y-3">
        <UserProfile user={user} />
        {user?.profile?.bio && <div>{user?.profile?.bio}</div>}
        {currentUser && <Follow user={user} showText />}
      </CardBody>
    </Card>
  )
}

export default UserCard
