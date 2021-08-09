import React, { Fragment, useState } from 'react'
import { useContext } from 'react'

import NewPost from '~/components/Posts/NewPost'
import Banner from '~/components/shared/Banner'
import AppContext from '~/components/utils/AppContext'
import Posts from '~/pages/posts'

import { GridItemEight, GridItemFour, GridLayout } from '../GridLayout'
import FeedType from '../Posts/FeedType'
import { ErrorMessage } from '../ui/ErrorMessage'
import RecentProducts from './RecentProducts'
import RecentUsers from './RecentUsers'

const Home: React.FC = () => {
  const [feedType, setFeedType] = useState<string>('ALL')
  const { currentUser, currentUserLoading, currentUserError } =
    useContext(AppContext)

  return (
    <Fragment>
      {!currentUser && !currentUserLoading && <Banner />}
      <GridLayout>
        <GridItemEight>
          <div className="space-y-3">
            {currentUser && <NewPost />}
            <div className="flex items-center justify-between">
              <FeedType setFeedType={setFeedType} />
              <div className="flex items-center gap-1.5">
                <input id="onlyFollowing" type="checkbox" className="rounded" />
                <label htmlFor="onlyFollowing">Only following</label>
              </div>
            </div>
            <Posts feedType={feedType} />
            <ErrorMessage
              title="Failed to load the current user."
              error={currentUserError}
            />
          </div>
        </GridItemEight>
        <GridItemFour>
          <RecentUsers />
          <RecentProducts />
        </GridItemFour>
      </GridLayout>
    </Fragment>
  )
}

export default Home
