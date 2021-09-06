import { gql, useQuery } from '@apollo/client'
import React from 'react'

import { GridItemEight, GridItemFour, GridLayout } from '../GridLayout'
import { Card, CardBody } from '../ui/Card'
import { StaffToolsUsersQuery } from './__generated__/users.generated'
import Sidebar from './Sidebar'

export const STAFF_TOOLS_USERS_QUERY = gql`
  query StaffToolsUsersQuery {
    me {
      id
    }
  }
`

const StaffToolsUsers: React.FC = () => {
  const { data, loading, error } = useQuery<StaffToolsUsersQuery>(
    STAFF_TOOLS_USERS_QUERY
  )

  return (
    <GridLayout>
      <GridItemFour>
        <Sidebar />
      </GridItemFour>
      <GridItemEight>
        <Card>
          <CardBody>TBD</CardBody>
        </Card>
      </GridItemEight>
    </GridLayout>
  )
}

export default StaffToolsUsers
