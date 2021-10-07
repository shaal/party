import { GridItemEight, GridItemFour, GridLayout } from '@components/GridLayout'
import { Button } from '@components/ui/Button'
import { Card, CardBody } from '@components/ui/Card'
import { DownloadIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import React from 'react'

import Sidebar from '../Sidebar'

const DataSettings: React.FC = () => {
  return (
    <GridLayout>
      <GridItemFour>
        <Sidebar />
      </GridItemFour>
      <GridItemEight>
        <Card>
          <CardBody className="space-y-5 linkify">
            <div className="text-lg font-bold">Export your account</div>
            <p>
              Most of the personal data that Devparty has about you is
              accessible through the Devparty app (e.g. posts, replies, products
              and user account). If you would like to get a consolidated copy of
              this data, you can download it by clicking the "Export Now"
              button.
            </p>
            <p>
              As the downloadable file you will receive will contain your
              profile information, you should keep it secure and be careful when
              storing, sending, or uploading it to any other services.
            </p>
            <p>
              If you have any questions about the personal data contained in
              your downloadable file, please{' '}
              <Link href="/contact">
                <a>contact us</a>
              </Link>
              .
            </p>
            <Button icon={<DownloadIcon className="h-5 w-5" />}>
              Export account now
            </Button>
          </CardBody>
        </Card>
      </GridItemEight>
    </GridLayout>
  )
}

export default DataSettings
