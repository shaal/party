import ProductProfileLarge from '@components/shared/ProductProfileLarge'
import UserProfile from '@components/shared/UserProfile'
import { Card, CardBody } from '@components/ui/Card'
import Link from 'next/link'
import React from 'react'
import { Notification, Product } from 'src/__generated__/schema.generated'
import * as timeago from 'timeago.js'

import MarkAsRead from '../Read'

interface Props {
  notification: Notification
}

const ProductSubscribe: React.FC<Props> = ({ notification }) => {
  return (
    <Card>
      <CardBody className="space-y-3">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <UserProfile user={notification?.dispatcher} />
            <div className="flex items-center space-x-3">
              <div className="text-sm cursor-pointer">
                {timeago.format(notification?.createdAt)}
              </div>
              <MarkAsRead notification={notification} />
            </div>
          </div>
          <div className="linkify">
            Subscribed to your{' '}
            <Link href={`/products/${notification?.product?.slug}`}>
              <a>product</a>
            </Link>
          </div>
        </div>
        <ProductProfileLarge product={notification?.product as Product} />
      </CardBody>
    </Card>
  )
}

export default ProductSubscribe
