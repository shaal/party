import { gql, useMutation } from '@apollo/client'
import { Button } from '@components/ui/Button'
import { TrashIcon } from '@heroicons/react/outline'
import React from 'react'
import toast from 'react-hot-toast'
import { Session } from 'src/__generated__/schema.generated'
import * as timeago from 'timeago.js'

import {
  RevokeSessionMutation,
  RevokeSessionMutationVariables
} from './__generated__/SingleSession.generated'
import { SESSION_SETTINGS_QUERY } from './index'

interface Props {
  session: Session
}

const SingleSession: React.FC<Props> = ({ session }) => {
  const [revokeSession, { loading: revoking }] = useMutation<
    RevokeSessionMutation,
    RevokeSessionMutationVariables
  >(
    gql`
      mutation RevokeSessionMutation($input: RevokeSessionInput!) {
        revokeSession(input: $input)
      }
    `,
    {
      refetchQueries: [{ query: SESSION_SETTINGS_QUERY }],
      onCompleted() {
        toast.success('Session revoked successfully!')
      }
    }
  )

  return (
    <div className="border dark:border-gray-700 p-3 rounded-lg flex items-center justify-between">
      <div className="space-y-1">
        <div className="font-bold">User agent</div>
        <div className="text-gray-600 dark:text-gray-300 text-sm">
          {session?.userAgent}
        </div>
        <div>
          {session?.ipAddress && (
            <div className="text-sm">
              IP:{' '}
              <span className="text-xs font-bold bg-gray-300 dark:bg-gray-900 py-0.5 px-1.5 rounded-md">
                {session?.ipAddress === '::1'
                  ? 'localhost'
                  : session?.ipAddress}
              </span>
            </div>
          )}
          <div className="text-sm">
            Created: {timeago.format(session?.createdAt)}
          </div>
          <div className="text-sm">
            Expires: {timeago.format(session?.expiresAt)}
          </div>
        </div>
      </div>
      {!session?.current && (
        <Button
          className="text-sm ml-10"
          size="sm"
          variant="danger"
          icon={<TrashIcon className="h-4 w-4" />}
          onClick={() =>
            revokeSession({ variables: { input: { id: session?.id } } })
          }
        >
          {revoking ? 'Revoking...' : 'Revoke'}
        </Button>
      )}
    </div>
  )
}

export default SingleSession
