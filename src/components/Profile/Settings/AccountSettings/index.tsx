import { gql, useQuery } from '@apollo/client'
import React from 'react'

import { User } from '~/__generated__/schema.generated'
import {
  GridItemEight,
  GridItemFour,
  GridLayout
} from '~/components/GridLayout'
import SettingsHelper from '~/components/shared/SettingsHelper'
import { Card, CardBody } from '~/components/ui/Card'

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
  const { data, loading } = useQuery<SettingsQuery>(query)

  if (loading) return <div>Loading...</div>

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
