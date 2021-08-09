import React from 'react'

import { User } from '~/__generated__/schema.generated'
import {
  GridItemEight,
  GridItemFour,
  GridLayout
} from '~/components/GridLayout'
import SettingsHelper from '~/components/shared/SettingsHelper'
import { Card, CardBody } from '~/components/ui/Card'

import SocialSettingsForm from './Form'

interface Props {
  currentUser: User
}

const SocialSettings: React.FC<Props> = ({ currentUser }) => {
  return (
    <GridLayout>
      <GridItemFour>
        <SettingsHelper
          heading="Social settings"
          description={'Update your online presense in the internet.'}
        />
      </GridItemFour>
      <GridItemEight>
        <Card>
          <CardBody>
            <SocialSettingsForm user={currentUser as User} />
          </CardBody>
        </Card>
      </GridItemEight>
    </GridLayout>
  )
}

export default SocialSettings
