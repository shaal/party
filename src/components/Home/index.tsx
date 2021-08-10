import { gql } from '@apollo/client'
import React, { Fragment, useState } from 'react'
import { useContext } from 'react'

import NewPost from '~/components/Posts/NewPost'
import Banner from '~/components/shared/Banner'
import AppContext from '~/components/utils/AppContext'

import { GridItemEight, GridItemFour, GridLayout } from '../GridLayout'
import FeedType from '../Posts/FeedType'
import { PostFragment } from '../Posts/SinglePost'
import { ErrorMessage } from '../ui/ErrorMessage'
import HomeFeed from './Feed'
import RecentProducts from './RecentProducts'
import RecentUsers from './RecentUsers'

const query = gql`
  query HomeFeedQuery($after: String, $where: WherePostsInput) {
    posts(first: 5, after: $after, where: $where) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          ...PostFragment
        }
      }
    }
  }
  ${PostFragment}
`

const Home: React.FC = () => {
  const [feedType, setFeedType] = useState<string>('ALL')
  const [onlyFollowing, setOnlyFollowing] = useState<boolean>(true)
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
              {currentUser && (
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
            <HomeFeed
              feedType={feedType}
              onlyFollowing={onlyFollowing}
              query={query}
            />
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
