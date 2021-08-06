import React, { Fragment } from 'react'
import { ErrorMessage } from '../ui/ErrorMessage'
import { GridItemEight, GridItemFour, GridLayout } from '../GridLayout'
import RecentUsers from './RecentUsers'
import NewPost from '~/components/Posts/NewPost'
import { useContext } from 'react'
import AppContext from '~/components/utils/AppContext'
import Banner from '~/components/shared/Banner'
import Posts from '~/pages/posts'

export const Home: React.FC = () => {
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
