import { GridItemEight, GridItemFour, GridLayout } from '@components/GridLayout'
import React from 'react'

import Sidebar from '../Sidebar'

const DataSettings: React.FC = () => {
  return (
    <GridLayout>
      <GridItemFour>
        <Sidebar />
      </GridItemFour>
      <GridItemEight>WIP</GridItemEight>
    </GridLayout>
  )
}

export default DataSettings
