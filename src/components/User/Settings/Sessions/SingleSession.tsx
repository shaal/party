import React from 'react'

import { Session } from '~/__generated__/schema.generated'
import { Button } from '~/components/ui/Button'

interface Props {
  session: Session
}

const SingleSession: React.FC<Props> = ({ session }) => {
  return (
    <div className="border p-3 rounded-lg flex items-center justify-between">
      <div className="space-y-1">
        <div className="font-bold text-lg">User agent</div>
        <div className="text-gray-600 dark:text-gray-300">
          {session?.userAgent}
        </div>
      </div>
      <Button className="text-sm" size="sm" variant="danger">
        Revoke
      </Button>
    </div>
  )
}

export default SingleSession
