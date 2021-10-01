import { GridItemEight, GridItemFour, GridLayout } from '@components/GridLayout'
import dynamic from 'next/dynamic'
import React from 'react'

import ExploreFeed from './Feed'
import Topics from './Topics'

const Footer = dynamic(() => import('@components/shared/Footer'))

const Explore: React.FC = () => {
  return (
    <GridLayout>
      <GridItemEight>
        <div className="space-y-3">
          <ExploreFeed />
        </div>
      </GridItemEight>
      <GridItemFour>
        <Topics />
        <Footer />
      </GridItemFour>
    </GridLayout>
  )
}

export default Explore
