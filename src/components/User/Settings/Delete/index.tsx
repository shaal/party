import { GridItemEight, GridItemFour, GridLayout } from '@components/GridLayout'
import { Button } from '@components/UI/Button'
import { Card, CardBody } from '@components/UI/Card'
import { Spinner } from '@components/UI/Spinner'
import AppContext from '@components/utils/AppContext'
import { TrashIcon } from '@heroicons/react/outline'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { ERROR_MESSAGE } from 'src/constants'

import Sidebar from '../Sidebar'

const DeleteSettings: React.FC = () => {
  const { currentUser } = useContext(AppContext)
  const [deleting, setDeleting] = useState<boolean>(false)
  const handleExport = () => {
    setDeleting(true)
    fetch('/api/export')
      .then((response) => [response.status, response.blob()])
      .then(async (result) => {
        if (result[0] === 200) {
          const blob = await result[1]
          var url = window.URL.createObjectURL(blob)
          var a = document.createElement('a')
          a.href = url
          a.download = `export-${currentUser?.id}.json`
          document.body.appendChild(a)
          a.click()
          a.remove()
        } else if (result[0] === 429) {
          toast.error(
            'You downloaded the export recently, Please try again after some days!'
          )
        } else {
          toast.error(ERROR_MESSAGE)
        }
      })
      .finally(() => setDeleting(false))
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
