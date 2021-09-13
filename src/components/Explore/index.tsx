import { useQuery } from '@apollo/client'
import React from 'react'

import Footer from '~/components/shared/Footer'
import { ErrorMessage } from '~/components/ui/ErrorMessage'

import { CurrentUserQuery } from '../__generated__/DefaultLayout.generated'
import { CURRENT_USER_QUERY } from '../DefaultLayout'
import { GridItemEight, GridItemFour, GridLayout } from '../GridLayout'
import ExploreFeed from './Feed'

export const EXPLORE_QUERY = CURRENT_USER_QUERY

const Explore: React.FC = () => {
  const { data, error } = useQuery<CurrentUserQuery>(EXPLORE_QUERY)

  return (
    <>
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
          <Footer />
        </GridItemFour>
      </GridLayout>
    </>
  )
}

export default Explore
