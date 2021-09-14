import React from 'react'

import { Card, CardBody } from '~/components/ui/Card'
import { Spinner } from '~/components/ui/Spinner'

interface Props {
  loading: boolean
  oembed: any
}

const Oembed: React.FC<Props> = ({ loading, oembed }) => {
  if (loading)
    return (
      <Card>
        <CardBody>
          <Spinner className="mx-auto" size="sm" />
        </CardBody>
      </Card>
    )

  return (
    <Card>
      <CardBody className="flex items-center justify-between space-x-5">
        <div className="text-sm space-y-2">
          <div className="font-bold flex items-center space-x-2">
            {oembed?.favicon && (
              <img
                className="h-4 w-4 rounded-md"
                src={oembed?.favicon}
                alt="Favicon"
              />
            )}
            <div className="line-clamp-1">{oembed?.title}</div>
          </div>
          <div className="line-clamp-2 text-gray-500">
            {oembed?.description}
          </div>
        </div>
        {oembed?.open_graph?.images[0]?.url && (
          <div>
            <img
              className="rounded-lg w-[50rem]"
              src={oembed?.open_graph?.images[0]?.url}
              alt="Image"
            />
          </div>
        )}
      </CardBody>
    </Card>
  )
}

export default Oembed
