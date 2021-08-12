import { useQuery } from '@apollo/client'
import React, { Fragment, useState } from 'react'

import NewPost from 'src/components/Post/NewPost'
import Banner from 'src/components/shared/Banner'

import { CurrentUserQuery } from '../__generated__/DefaultLayout.generated'
import { CURRENT_USER_QUERY } from '../DefaultLayout'
import { GridItemEight, GridItemFour, GridLayout } from '../GridLayout'
import FeedType from '../Post/FeedType'
import { ErrorMessage } from '../ui/ErrorMessage'
import HomeFeed from './Feed'
import RecentProducts from './RecentProducts'
import RecentUsers from './RecentUsers'

export const HOME_QUERY = CURRENT_USER_QUERY

const Home: React.FC = () => {
  const [feedType, setFeedType] = useState<string>('ALL')
  const { data, loading, error } = useQuery<CurrentUserQuery>(HOME_QUERY)

  return (
    <Fragment>
      {!data?.me && !loading && <Banner />}
      <GridLayout>
        <GridItemEight>
          <div className="space-y-3">
            {data?.me && <NewPost />}
            <FeedType setFeedType={setFeedType} />
            <HomeFeed feedType={feedType} />
            <ErrorMessage
              title="Failed to load the current user."
              error={error}
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
