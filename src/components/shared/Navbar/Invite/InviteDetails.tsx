import { gql, useMutation, useQuery } from '@apollo/client'
import Slug from '@components/shared/Slug'
import { Button } from '@components/UI/Button'
import { Spinner } from '@components/UI/Spinner'
import {
  InviteCodeQuery,
  RegenerateInviteMutation,
  RegenerateInviteMutationVariables
} from '@graphql/types.generated'
import { CursorClickIcon, RefreshIcon } from '@heroicons/react/outline'
import toast from 'react-hot-toast'
import { BASE_URL, STATIC_ASSETS } from 'src/constants'

export const INVITE_CODE_QUERY = gql`
  query InviteCode {
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
      mutation RegenerateInvite {
        regenerateInvite {
          id
          code
          usedTimes
        }
      }
    `,
    {
      refetchQueries: [{ query: INVITE_CODE_QUERY }],
      onError(error) {
        toast.error(error.message)
      },
      onCompleted() {
        toast.success('Invite code regenerated successfully!')
      }
    }
  )
  const user = data?.me

  if (loading)
    return (
      <div className="px-5 py-3.5 font-bold text-center space-y-2">
        <Spinner size="md" className="mx-auto" />
        <div>Loading invite details</div>
      </div>
    )

  return (
    <>
      <div className="bg-brand-300 py-2">
        <img
          className="object-cover h-60 w-60 mx-auto"
          src={`${STATIC_ASSETS}/illustrations/invite.png`}
          alt="Invite Illustration"
        />
      </div>
      <div className="px-5 py-3.5">
        <div className="text-center space-y-4">
          <div className="text-xl font-bold">
            Invite your friends & colleagues to Devparty
          </div>
          <div>
            Hey {<Slug slug={user?.username} prefix="@" />} 👋 You can either
            share your personalized invite link or your unique invite code with
            friends!
          </div>
        </div>
        {user?.invite ? (
          <>
            <div className="mt-4 space-y-1.5">
              <div className="text-sm font-bold">Your Invite Link</div>
              <div className="flex items-center justify-between bg-gray-200 dark:bg-gray-800 border-gray-300 dark:border-gray-700 px-2 py-1.5 rounded-lg border select-all">
                <div>
                  {BASE_URL}/invite/{user?.invite?.code}
                </div>
                <button onClick={() => regenerateInvite()}>
                  <RefreshIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                </button>
              </div>
            </div>
            <div className="mt-4 space-y-1.5">
              <div className="text-sm font-bold">Your Invite Code</div>
              <div className="flex items-center justify-between bg-gray-200 dark:bg-gray-800 border-gray-300 dark:border-gray-700 px-2 py-1.5 rounded-lg border select-all">
                <div>{user?.invite?.code}</div>
                <button onClick={() => regenerateInvite()}>
                  <RefreshIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                </button>
              </div>
            </div>
            <div className="mt-5 mb-1 text-center">
              You have invited <b>{user?.invite?.usedTimes}</b> people so far.
            </div>
          </>
        ) : (
          <div className="mt-4 mb-1">
            <Button
              className="mx-auto"
              onClick={() => regenerateInvite()}
              icon={<CursorClickIcon className="h-4 w-4" />}
            >
              Generate Invite
            </Button>
          </div>
        )}
      </div>
    </>
  )
}

export default InviteDetails
