import React from 'react'
import Posts from '@pages/posts'
import { ErrorMessage } from '../ui/ErrorMessage'
import { GridItemEight, GridItemFour, GridLayout } from '../ui/GridLayout'
import { RecentUsers } from './RecentUsers'
import { NewPost } from '@components/Posts/NewPost'
import { useContext } from 'react'
import AppContext from '@components/utils/AppContext'

export const Home: React.FC = () => {
  const { currentUser, currentUserError } = useContext(AppContext)

  return (
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
  )
}
