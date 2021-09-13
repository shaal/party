import { TrashIcon } from '@heroicons/react/outline'
import { Prisma } from '@prisma/client'
import React from 'react'

import { Button } from '~/components/ui/Button'

interface Props {
  attachments: Prisma.JsonArray
  setAttachments?: any
  isNew?: boolean
}

const Attachments: React.FC<Props> = ({
  attachments,
  setAttachments,
  isNew = false
}) => {
  const removeAttachment = (attachment: any) => {
    const arr = attachments
    setAttachments(
      arr.filter(function (ele) {
        return ele != attachment
      })
    )
  }

  const getGridRows = (attachments: number) => {
    if (attachments > 2) {
      return 'grid grid-flow-col grid-cols-2 grid-rows-2 gap-2'
    } else {
      return 'grid grid-flow-col grid-cols-2 grid-rows1 gap-2'
    }
  }

  return (
    <>
      {attachments?.length !== 0 && (
        <div className={getGridRows(attachments?.length)}>
          {attachments?.map((attachment: any) => (
            <div className="aspect-w-16 aspect-h-12" key={attachment}>
              {attachment.type === 'video/mp4' ? (
                <video
                  controls
                  className="rounded-lg object-cover bg-gray-100 dark:bg-gray-800 border dark:border-gray-800"
                >
                  <source src={attachment.url} type="video/mp4" />
                </video>
              ) : (
                <img
                  className="rounded-lg object-cover bg-gray-100 dark:bg-gray-800 border dark:border-gray-800"
                  src={attachment.url}
                  alt={attachment.url}
                />
              )}
              {isNew && (
                <div className="m-3">
                  <Button
                    variant="danger"
                    onClick={() => removeAttachment(attachment)}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Attachments
