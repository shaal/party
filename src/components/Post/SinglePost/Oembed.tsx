import React from 'react'

import { Card, CardBody } from '~/components/ui/Card'

interface Props {
  url: string
  oembed: any
}

const Oembed: React.FC<Props> = ({ url, oembed }) => {
  const { title, description, favicon, open_graph, twitter_card } = oembed

  return (
    <Card
      className={`${twitter_card?.card === 'summary' ? 'flex' : ''} w-[70%]`}
    >
      {twitter_card?.card === 'summary_large_image' &&
        twitter_card?.images[0]?.url && (
          <img
            className="rounded-t-lg border-b"
            src={twitter_card?.images[0]?.url}
            alt="Image"
          />
        )}
      {twitter_card?.card === 'summary' && twitter_card?.images[0]?.url && (
        <img
          className="rounded-l-lg h-28 w-28 border-r bg-cover bg-center bg-no-repeat"
          src={open_graph?.images[0]?.url}
          alt="Image"
        />
      )}
      <CardBody className="flex justify-between space-x-5">
        <a
          className="text-sm space-y-2"
          href={url}
          target="_blank"
          rel="noreferrer"
        >
          <div className="font-bold flex items-center space-x-2">
            {favicon && (
              <img className="h-4 w-4 rounded-md" src={favicon} alt="Favicon" />
            )}
            <div className="line-clamp-1">{title}</div>
          </div>
          <div className="line-clamp-2 text-gray-500">{description}</div>
        </a>
      </CardBody>
    </Card>
  )
}

export default Oembed
