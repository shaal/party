import { gql, useQuery } from '@apollo/client'
import React from 'react'

import { GridItemEight, GridItemFour, GridLayout } from '../GridLayout'
import { StaffToolsDashboardQuery } from './__generated__/index.generated'
import Sidebar from './Sidebar'

export const STAFF_TOOLS_DASHBOARD_QUERY = gql`
  query StaffToolsDashboardQuery {
    me {
      id
    }
  }
`

const StaffToolsDashboard: React.FC = () => {
  const { data, loading, error } = useQuery<StaffToolsDashboardQuery>(
    STAFF_TOOLS_DASHBOARD_QUERY
  )

  return (
    <GridLayout>
      <GridItemFour>
        <Sidebar />
      </GridItemFour>
      <GridItemEight>TBD</GridItemEight>
    </GridLayout>
  )
}

export default StaffToolsDashboard
