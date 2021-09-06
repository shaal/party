import { useQuery } from '@apollo/client'
import React, { Fragment, useState } from 'react'

import FeedType from '~/components/Home/FeedType'
import Footer from '~/components/shared/Footer'
import { ErrorMessage } from '~/components/ui/ErrorMessage'

import { CurrentUserQuery } from '../__generated__/DefaultLayout.generated'
import { CURRENT_USER_QUERY } from '../DefaultLayout'
import { GridItemEight, GridItemFour, GridLayout } from '../GridLayout'
import NewPost from '../Post/NewPost'
import Announcement from './Announcement'
import HomeFeed from './Feed'
import RecentProducts from './RecentProducts'
import RecentUsers from './RecentUsers'

export const HOME_QUERY = CURRENT_USER_QUERY

const Home: React.FC = () => {
  const [feedType, setFeedType] = useState<string>('ALL')
  const { data, error } = useQuery<CurrentUserQuery>(HOME_QUERY)

  return (
    <Fragment>
      <GridLayout>
        <GridItemEight>
          <div className="space-y-3">
            {data?.me && <NewPost />}
            <FeedType setFeedType={setFeedType} feedType={feedType} />
            <HomeFeed feedType={feedType} />
            <ErrorMessage
              title="Failed to load the current user."
              error={error}
            />
          </div>
        </GridItemEight>
        <GridItemFour>
          {true && <Announcement />}
          <RecentUsers />
          <RecentProducts />
          <Footer />
        </GridItemFour>
      </GridLayout>
    </Fragment>
  )
}

export default Home
