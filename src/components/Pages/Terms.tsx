import React, { Fragment } from 'react'

import Footer from '../shared/Footer'

const Terms: React.FC = () => {
  return (
    <Fragment>
      <div className="flex items-center justify-center bg-brand-400 h-44 w-full">
        <div className="relative text-center">
          <h1 className="text-3xl md:text-4xl font-semibold text-white">
            Terms of Service
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
          <div className="relative mx-auto rounded-lg max-w-3/4 md:w-3/4">
            <div className="!p-8 prose max-w-none text-gray-900 dark:text-gray-200">
              <p>
                Welcome to the Devparty. <b>(Devparty, "us" "we" or "our")</b>{' '}
                website. Please read these Terms of Service (the <b>"Terms"</b>)
                carefully because they govern your use of devparty.io and any
                other websites that we may later own or operate (each, a{' '}
                <b>"Site,"</b>
                and collectively, the <b>"Sites"</b>) and our application
                program interfaces (<b>"APIs"</b>).
              </p>
              <p>
                <b>ARBITRATION NOTICE:</b> UNLESS YOU OPT OUT OF ARBITRATION
                WITHIN 30 DAYS OF THE DATE YOU FIRST AGREE TO THESE TERMS BY
                FOLLOWING THE OPT-OUT PROCEDURE SPECIFIED IN THE "DISPUTE
                RESOLUTION" SECTION BELOW, THESE TERMS WILL, WITH LIMITED
                EXCEPTION, REQUIRE YOU TO SUBMIT CLAIMS YOU HAVE AGAINST US TO
                BINDING AND FINAL ARBITRATION SOLELY ON AN INDIVIDUAL BASIS, AND
                NOT AS PART OF A CLASS, REPRESENTATIVE OR CONSOLIDATED ACTION.
              </p>
              <h2 className="text-black dark:text-white">
                1. Agreement to these Terms
              </h2>
              <p>
                By using the Services, you agree to be bound by these Terms. If
                you don’t agree to these Terms, do not use the Services. If you
                are accessing and using the Services on behalf of a company
                (such as your employer) or other legal entity, you represent and
                warrant that you have the authority to bind that company or
                other legal entity to these Terms. In that case, "you" and
                "your" will refer to that company or other legal entity.
              </p>
              <h2 className="text-black dark:text-white">
                2. Changes to the Terms or Services
              </h2>
              <p>
                We may modify the Terms at any time, at our sole discretion. If
                we do so, we will let you know either by posting the modified
                Terms on the Site or through other communications. If you
                continue to use the Services after such a change, you are
                indicating that you agree to the modified Terms. We may also
                change or discontinue all or any part of the Services, at any
                time and without notice, at our sole discretion.
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

export default Terms
