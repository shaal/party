import React from 'react'
import * as timeago from 'timeago.js'

import { Notification } from '~/__generated__/schema.generated'
import { Card, CardBody } from '~/components/ui/Card'

import Slug from '../shared/Slug'
import UserProfileLarge from '../shared/UserProfileLarge'

interface Props {
  notification: Notification
}

const FollowNotification: React.FC<Props> = ({ notification }) => {
  return (
    <Card>
      <CardBody className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Slug slug={notification?.dispatcher?.username} prefix="@" />{' '}
            <div>Followed you</div>
          </div>
          <div className="text-sm cursor-pointer">
            {timeago.format(notification?.createdAt)}
          </div>
        </div>
        <UserProfileLarge user={notification?.dispatcher} showFollow />
      </CardBody>
    </Card>
  )
}

export default FollowNotification
