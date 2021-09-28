import Slug from '@components/shared/Slug'
import UserProfileLarge from '@components/shared/UserProfileLarge'
import { Card, CardBody } from '@components/ui/Card'
import React from 'react'
import { Notification } from 'src/__generated__/schema.generated'
import * as timeago from 'timeago.js'

import MarkAsRead from '../Read'

interface Props {
  notification: Notification
}

const UserFollow: React.FC<Props> = ({ notification }) => {
  return (
    <Card>
      <CardBody className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Slug slug={notification?.dispatcher?.username} prefix="@" />
            <div>Followed you</div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-sm cursor-pointer">
              {timeago.format(notification?.createdAt)}
            </div>
            <MarkAsRead notification={notification} />
          </div>
        </div>
        <UserProfileLarge user={notification?.dispatcher} showFollow />
      </CardBody>
    </Card>
  )
}

export default UserFollow
