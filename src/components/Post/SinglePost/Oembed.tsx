import clsx from 'clsx'
import React from 'react'

import { Card, CardBody } from '~/components/ui/Card'

interface Props {
  url: string
  oembed: any
}

const Oembed: React.FC<Props> = ({ url, oembed }) => {
  const { title, description, favicon, open_graph, twitter_card } = oembed

  const finalTitle = title
    ? title
    : open_graph?.title
    ? open_graph?.title
    : twitter_card?.title

  const finalDescription = description
    ? description
    : open_graph?.description
    ? open_graph?.description
    : twitter_card?.description

  let finalImage
  if (open_graph?.images) {
    finalImage = `https://ik.imagekit.io/devparty/${open_graph?.images[0]?.url}`
  } else if (twitter_card?.images) {
    finalImage = `https://ik.imagekit.io/devparty/${twitter_card?.images[0]?.url}`
  } else {
    finalImage = null
  }

  return (
    <Card
      className={clsx(
        { flex: twitter_card?.card === 'summary' },
        '!rounded-lg w-full sm:w-[70%]'
      )}
    >
      {twitter_card?.card === 'summary_large_image' && finalImage && (
        <img
          className="rounded-t-lg border-b border-gray-200 dark:border-gray-800"
          src={finalImage}
          alt="Image"
        />
      )}
      {twitter_card?.card === 'summary' && finalImage && (
        <img
          className="rounded-l-lg h-28 w-28 border-r border-gray-200 dark:border-gray-800 bg-cover bg-center bg-no-repeat"
          src={finalImage}
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
              <img
                className="h-4 w-4 rounded-sm text-gray-400"
                src={`https://ik.imagekit.io/devparty/${favicon}`}
                onError={(evt: any) =>
                  (evt.target.src =
                    'https://assets.devparty.io/images/icons/link.svg')
                }
                alt="Favicon"
              />
            )}
            <div className="line-clamp-1">{finalTitle}</div>
          </div>
          <div className="line-clamp-2 text-gray-500">{finalDescription}</div>
        </a>
      </CardBody>
    </Card>
  )
}

export default Oembed
