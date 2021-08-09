import { gql, useQuery } from '@apollo/client'
import React, { useContext } from 'react'

import { User } from '~/__generated__/schema.generated'
import {
  GridItemEight,
  GridItemFour,
  GridLayout
} from '~/components/GridLayout'
import SettingsHelper from '~/components/shared/SettingsHelper'
import { Card, CardBody } from '~/components/ui/Card'
import AppContext from '~/components/utils/AppContext'

import AccountSettingsForm from '../AccountSettings/Form'
import { SettingsQuery } from './__generated__/index.generated'

export const query = gql`
  query SettingsQuery {
    me {
      id
      username
      email
      profile {
        name
      }
    }
  }
`

const AccountSettings: React.FC = () => {
  const { currentUser } = useContext(AppContext)
  const { data, loading } = useQuery<SettingsQuery>(query)

  if (loading) return <div>Loading...</div>

  if (!currentUser) return <div>Forbidden...</div>

  return (
    <GridLayout>
      <GridItemFour>
        <SettingsHelper
          heading="Account settings"
          description={
            "Update your account's contact information and email address."
          }
        />
      </GridItemFour>
      <GridItemEight>
        <Card>
          <CardBody>
            <AccountSettingsForm user={data?.me as User} />
          </CardBody>
        </Card>
      </GridItemEight>
    </GridLayout>
  )
}

export default AccountSettings
