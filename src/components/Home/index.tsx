import { useQuery } from '@apollo/client'
import React, { Fragment, useState } from 'react'

import NewPost from '~/components/Post/NewPost'
import Banner from '~/components/shared/Banner'

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
  const [onlyFollowing, setOnlyFollowing] = useState<boolean>(true)
  const { data, loading, error } = useQuery<CurrentUserQuery>(HOME_QUERY)

  return (
    <Fragment>
      {!data?.me && !loading && <Banner />}
      <GridLayout>
        <GridItemEight>
          <div className="space-y-3">
            {data?.me && <NewPost />}
            <div className="flex items-center justify-between">
              <FeedType setFeedType={setFeedType} />
              {data?.me && (
                <div className="flex items-center gap-1.5">
                  <input
                    id="onlyFollowing"
                    type="checkbox"
                    className="rounded"
                    checked={onlyFollowing}
                    onChange={() => setOnlyFollowing(!onlyFollowing)}
                  />
                  <label htmlFor="onlyFollowing">Only following</label>
                </div>
              )}
            </div>
            <HomeFeed feedType={feedType} onlyFollowing={onlyFollowing} />
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
