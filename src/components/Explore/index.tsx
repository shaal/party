import { useQuery } from '@apollo/client'
import { CurrentUserQuery } from '@components/__generated__/DefaultLayout.generated'
import { CURRENT_USER_QUERY } from '@components/DefaultLayout'
import { GridItemEight, GridItemFour, GridLayout } from '@components/GridLayout'
import Footer from '@components/shared/Footer'
import { Button } from '@components/ui/Button'
import { Card, CardBody } from '@components/ui/Card'
import { ErrorMessage } from '@components/ui/ErrorMessage'
import AppContext from '@components/utils/AppContext'
import { LoginIcon, UserAddIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import React, { useContext } from 'react'

import ExploreFeed from './Feed'

export const EXPLORE_QUERY = CURRENT_USER_QUERY

const Explore: React.FC = () => {
  const { currentUser } = useContext(AppContext)
  const { error } = useQuery<CurrentUserQuery>(EXPLORE_QUERY)

  return (
    <GridLayout>
      <GridItemEight>
        <div className="space-y-3">
          <ExploreFeed />
          <ErrorMessage
            title="Failed to load the current user."
            error={error}
          />
        </div>
      </GridItemEight>
      <GridItemFour>
        <Card>
          <CardBody className="space-y-3">
            {currentUser ? (
              <div>Hello</div>
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
        <Footer />
      </GridItemFour>
    </GridLayout>
  )
}

export default Explore
