import { gql } from '@apollo/client'
import Slug from '@components/shared/Slug'
import { Button } from '@components/ui/Button'
import { Card, CardBody } from '@components/ui/Card'
import { LoginIcon, UserAddIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import React from 'react'
import { User } from 'src/__generated__/schema.generated'

export const GET_EXPLORE_USER_QUERY = gql`
  query GetExploreUserQuery($username: String!) {
    user(username: $username) {
      id
      username
      profile {
        id
        name
        avatar
      }
    }
  }
`

interface Props {
  currentUser: User
  user: User
}

const Topics: React.FC<Props> = ({ currentUser, user }) => {
  return (
    <Card>
      <CardBody className="space-y-3">
        {currentUser ? (
          <div className="space-y-3 text-center">
            <img
              className="h-16 w-16 rounded-full mx-auto"
              src={user?.profile?.avatar as string}
              alt={`@${user?.username}'s avatar`}
            />
            <div>
              <div className="font-bold text-lg">{user?.profile?.name}</div>
              <Slug slug={user?.username} prefix="@" />
            </div>
          </div>
        ) : (
          <>
            <div>Join Devparty today!</div>
            <div className="flex space-x-1.5">
              <Link href="/login" passHref>
                <Button className="flex items-center space-x-1">
                  <LoginIcon className="h-4 w-4" />
                  <div>Login</div>
                </Button>
              </Link>
              <Link href="/signup" passHref>
                <Button
                  className="flex items-center space-x-1"
                  variant="success"
                >
                  <UserAddIcon className="h-4 w-4" />
                  <div>Signup</div>
                </Button>
              </Link>
            </div>
          </>
        )}
      </CardBody>
    </Card>
  )
}

export default Topics
