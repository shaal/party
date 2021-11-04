import { GridItemEight, GridItemFour, GridLayout } from '@components/GridLayout'
import { Button } from '@components/UI/Button'
import { Card, CardBody } from '@components/UI/Card'
import { Spinner } from '@components/UI/Spinner'
import { TrashIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

import Sidebar from '../Sidebar'

const DeleteSettings: React.FC = () => {
  const [deleting, setDeleting] = useState<boolean>(false)
  const handleExport = () => {
    var confirm = prompt('Type (delete) to confirm')
    if (confirm === 'delete') {
      setDeleting(true)
    } else {
      toast.success('You cancelled the operation!')
      setDeleting(false)
    }
  }

  return (
    <GridLayout>
      <GridItemFour>
        <Sidebar />
      </GridItemFour>
      <GridItemEight>
        <Card>
          <CardBody className="space-y-5 linkify">
            <div className="text-lg font-bold text-red-500">
              Delete your account
            </div>
            <p>
              Deleting your account is permanent. All your data will be wiped
              out immediately and you won't be able to get it back.
            </p>
            <Button
              variant="danger"
              icon={
                deleting ? (
                  <Spinner size="xs" />
                ) : (
                  <TrashIcon className="h-5 w-5" />
                )
              }
              onClick={handleExport}
            >
              {deleting ? 'Deleting in progress...' : 'Delete your account'}
            </Button>
          </CardBody>
        </Card>
      </GridItemEight>
    </GridLayout>
  )
}

export default DeleteSettings
