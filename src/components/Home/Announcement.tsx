import React from 'react'

import { Card } from '~/components/ui/Card'

const Announcement: React.FC = () => {
  return (
    <Card className="mb-4 border-yellow-400 px-5 py-3">
      <div className="text-yellow-700">
        Devparty is currently in Preview mode, your data might be lost
      </div>
    </Card>
  )
}

export default Announcement
