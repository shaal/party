import { TrashIcon } from '@heroicons/react/outline'
import { Prisma } from '@prisma/client'
import Image from 'next/image'
import React, { Fragment } from 'react'

import { Button } from 'src/components/ui/Button'

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
    <Fragment>
      {attachments?.length !== 0 && (
        <div className={getGridRows(attachments?.length)}>
          {attachments?.map((attachment: any) => (
            <div className="aspect-w-16 aspect-h-12" key={attachment}>
              <Image
                className="rounded-lg object-cover bg-gray-100 dark:bg-gray-800 border dark:border-gray-800"
                layout="fill"
                src={attachment}
                alt={attachment}
              />
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
    </Fragment>
  )
}

export default Attachments
