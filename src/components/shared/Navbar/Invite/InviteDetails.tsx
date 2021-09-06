import { gql, useQuery } from '@apollo/client'
import { Fragment } from 'react'

import Slug from '../../Slug'
import { InviteCodeQuery } from './__generated__/InviteDetails.generated'

export const INVITE_CODE_QUERY = gql`
  query InviteCodeQuery {
    me {
      id
      username
      invite {
        id
        code
        usedTimes
      }
    }
  }
`

const InviteDetails: React.FC = () => {
  const { data, loading } = useQuery<InviteCodeQuery>(INVITE_CODE_QUERY)

  if (loading) return <div className="px-5 py-3.5">Loading Invite Code...</div>

  return (
    <Fragment>
      <img
        className="object-cover h-[18.5rem] w-full"
        src="https://i.ibb.co/xYQW7cs/invite.webp"
        alt="Invite Illustration"
      />
      <div className="px-5 py-3.5">
        <div className="text-center space-y-4">
          <div className="text-xl font-bold">
            Invite your friends & colleagues to Devparty
          </div>
          <div>
            Hey {<Slug slug={data?.me?.username} prefix="@" />} 👋 You can
            either share your personalized invite link or your unique invite
            code with friends!
          </div>
        </div>
        <div className="mt-4 space-y-1.5">
          <div className="text-sm font-bold">Your Invite Link</div>
          <div className="bg-gray-200 px-2 py-1.5 rounded-lg border border-gray-300">
            {process.env.BASE_URL}/invite/{data?.me?.invite?.code}
          </div>
        </div>
        <div className="border-b" />
        <div className="mt-4 space-y-1.5">
          <div className="text-sm font-bold">Your Invite Code</div>
          <div className="bg-gray-200 px-2 py-1.5 rounded-lg border border-gray-300">
            {data?.me?.invite?.code}
          </div>
        </div>
        <div className="mt-5 mb-1 text-center">
          You've invited <b>{data?.me?.invite?.usedTimes}</b> people so far.
        </div>
      </div>
    </Fragment>
  )
}

export default InviteDetails
