import React, { useState } from 'react'

import { Button } from '~/components/ui/Button'

import NewBadge from './New'

const AddBadgesModal: React.FC = () => {
  const [showCreate, setShowCreate] = useState<boolean>(false)
  return (
    <div className="px-5 py-3.5">
      <div>
        <Button className="w-full" onClick={() => setShowCreate(!showCreate)}>
          {showCreate ? 'Back' : 'Add new badge'}
        </Button>
      </div>
      {showCreate ? <NewBadge /> : <div>Badges list</div>}
    </div>
  )
}

export default AddBadgesModal
