import React from 'react'
import { Log } from 'src/__generated__/schema.generated'

interface Props {
  log: Log
}

const SingleLog: React.FC<Props> = ({ log }) => {
  return (
    <div className="border dark:border-gray-700 p-3 rounded-lg flex items-center justify-between">
      <div className="space-y-1">
        <div className="text-gray-600 dark:text-gray-300 text-sm">
          {log?.id}
        </div>
      </div>
    </div>
  )
}

export default SingleLog
