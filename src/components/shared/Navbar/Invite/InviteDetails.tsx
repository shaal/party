import { gql, useMutation, useQuery } from '@apollo/client'
import Slug from '@components/shared/Slug'
import { Tooltip } from '@components/ui/Tooltip'
import { RefreshIcon } from '@heroicons/react/outline'
import toast from 'react-hot-toast'

import {
  InviteCodeQuery,
  RegenerateInviteMutation,
  RegenerateInviteMutationVariables
} from './__generated__/InviteDetails.generated'

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

  const [regenerateInvite] = useMutation<
    RegenerateInviteMutation,
    RegenerateInviteMutationVariables
  >(
    gql`
      mutation RegenerateInviteMutation {
        regenerateInvite {
          id
          code
          usedTimes
        }
      }
    `,
    {
      onError() {
        toast.error('Something went wrong!')
      },
      onCompleted() {
        toast.success('Invite code regenerated successfully!')
      }
    }
  )

  if (loading)
    return <div className="px-5 py-3.5">Loading invite details...</div>

  return (
    <>
      <div className="bg-brand-300 py-2">
        <img
          className="object-cover h-60 w-60 mx-auto"
          src="https://assets.devparty.io/images/illustrations/invite.png"
          alt="Invite Illustration"
        />
      </div>
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
          <div className="flex items-center justify-between bg-gray-200 dark:bg-gray-800 border-gray-300 dark:border-gray-700 px-2 py-1.5 rounded-lg border select-all">
            <div>
              {process.env.BASE_URL}/invite/{data?.me?.invite?.code}
            </div>
            <Tooltip content="Regenerate Invite">
              <div
                className="cursor-pointer"
                onClick={() => regenerateInvite()}
              >
                <RefreshIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </div>
            </Tooltip>
          </div>
        </div>
        <div className="mt-4 space-y-1.5">
          <div className="text-sm font-bold">Your Invite Code</div>
          <div className="flex items-center justify-between bg-gray-200 dark:bg-gray-800 border-gray-300 dark:border-gray-700 px-2 py-1.5 rounded-lg border select-all">
            <div>{data?.me?.invite?.code}</div>
            <Tooltip content="Regenerate Invite">
              <div
                className="cursor-pointer"
                onClick={() => regenerateInvite()}
              >
                <RefreshIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </div>
            </Tooltip>
          </div>
        </div>
        <div className="mt-5 mb-1 text-center">
          You've invited <b>{data?.me?.invite?.usedTimes}</b> people so far.
        </div>
      </div>
    </>
  )
}

export default InviteDetails
