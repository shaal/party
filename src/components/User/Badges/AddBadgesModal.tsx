import dynamic from 'next/dynamic'
import React, { useState } from 'react'

import { Button } from '~/components/ui/Button'

const NewBadge = dynamic(() => import('./New'))

const AddBadgesModal: React.FC = () => {
  const [showCreate, setShowCreate] = useState<boolean>(false)
  return (
    <div className="px-5 py-3.5 space-y-5">
      <div>
        <Button
          className="w-full"
          onClick={() => setShowCreate(!showCreate)}
          outline={showCreate}
        >
          {showCreate ? 'Back' : 'Add new badge'}
        </Button>
      </div>
      {showCreate ? (
        <NewBadge setShowCreate={setShowCreate} />
      ) : (
        <div>Badges list</div>
      )}
    </div>
  )
}

export default AddBadgesModal
