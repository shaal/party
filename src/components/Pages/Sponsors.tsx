import React, { Fragment } from 'react'

import Footer from '../shared/Footer'

const Sponsors: React.FC = () => {
  return (
    <Fragment>
      <div className="flex items-center justify-center bg-brand-400 h-44 w-full">
        <div className="relative text-center">
          <h1 className="text-3xl md:text-4xl font-semibold text-white">
            Sponsors
          </h1>
        </div>
      </div>
      <div className="relative">
        <div className="flex justify-center">
          <div className="relative mx-auto rounded-lg max-w-3/4 md:w-3/4">
            <div className="!p-8 prose max-w-none text-gray-900 dark:text-gray-200">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center pt-2 pb-6">
          <Footer />
        </div>
      </div>
    </Fragment>
  )
}

export default Sponsors
