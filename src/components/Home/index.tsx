import React, { Fragment } from 'react'
import { useContext } from 'react'

import NewPost from '~/components/Posts/NewPost'
import Banner from '~/components/shared/Banner'
import AppContext from '~/components/utils/AppContext'
import Posts from '~/pages/posts'

import { GridItemEight, GridItemFour, GridLayout } from '../GridLayout'
import { ErrorMessage } from '../ui/ErrorMessage'
import RecentUsers from './RecentUsers'

const Home: React.FC = () => {
  const { currentUser, currentUserLoading, currentUserError } =
    useContext(AppContext)

  return (
    <Fragment>
      {!currentUser && !currentUserLoading && <Banner />}
      <GridLayout>
        <GridItemEight>
          <div className="space-y-6">
            {currentUser && <NewPost />}
            <Posts />
            <ErrorMessage
              title="Failed to load the current user."
              error={currentUserError}
            />
          </div>
        </GridItemEight>
        <GridItemFour>
          <RecentUsers />
        </GridItemFour>
      </GridLayout>
    </Fragment>
  )
}

export default Home
