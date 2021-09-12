import React, { Fragment } from 'react'

import Footer from '../shared/Footer'
import { Card, CardBody } from '../ui/Card'

const Terms: React.FC = () => {
  return (
    <Fragment>
      <div className="flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-400 h-64 w-full">
        <div className="relative text-center">
          <h1 className="text-3xl md:text-4xl font-semibold -mt-5 text-white">
            Terms and Conditions
          </h1>
          <div className="flex justify-center mt-4">
            <div className="text-xs rounded-md px-2 py-0.5 text-white bg-gray-800">
              Updated Sept 11, 2021
            </div>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="flex justify-center">
          <Card className="relative mx-auto -top-14 rounded-lg max-w-3/4 md:w-3/4 shadow-lg">
            <CardBody className="!p-8">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
              <div className="mt-5 font-semibold text-xl">1. Terms</div>
              <p className="mt-2">
                Terms By accessing this Website, accessible from taskord.com
                and/or www.taskord.com, you are agreeing to be bound by these
                Website Terms and Conditions of Use and agree that you are
                responsible for the agreement with any applicable local laws. If
                you disagree with any of these terms, you are prohibited from
                accessing this site. The materials contained in this Website are
                protected by copyright and trademark law.
              </p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
              <div className="mt-5 font-semibold text-xl">1. Terms</div>
              <p className="my-2">
                Terms By accessing this Website, accessible from taskord.com
                and/or www.taskord.com, you are agreeing to be bound by these
                Website Terms and Conditions of Use and agree that you are
                responsible for the agreement with any applicable local laws. If
                you disagree with any of these terms, you are prohibited from
                accessing this site. The materials contained in this Website are
                protected by copyright and trademark law.
              </p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
              <div className="mt-5 font-semibold text-xl">1. Terms</div>
              <p className="my-2">
                Terms By accessing this Website, accessible from taskord.com
                and/or www.taskord.com, you are agreeing to be bound by these
                Website Terms and Conditions of Use and agree that you are
                responsible for the agreement with any applicable local laws. If
                you disagree with any of these terms, you are prohibited from
                accessing this site. The materials contained in this Website are
                protected by copyright and trademark law.
              </p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
              <div className="mt-5 font-semibold text-xl">1. Terms</div>
              <p className="my-2">
                Terms By accessing this Website, accessible from taskord.com
                and/or www.taskord.com, you are agreeing to be bound by these
                Website Terms and Conditions of Use and agree that you are
                responsible for the agreement with any applicable local laws. If
                you disagree with any of these terms, you are prohibited from
                accessing this site. The materials contained in this Website are
                protected by copyright and trademark law.
              </p>
            </CardBody>
          </Card>
        </div>
        <div className="flex justify-center pb-4">
          <Footer />
        </div>
      </div>
    </Fragment>
  )
}

export default Terms
