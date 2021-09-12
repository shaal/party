import { gql, useMutation } from '@apollo/client'
import React from 'react'
import toast from 'react-hot-toast'
import * as timeago from 'timeago.js'

import { Session } from '~/__generated__/schema.generated'
import { Button } from '~/components/ui/Button'

import {
  RevokeSessionMutation,
  RevokeSessionMutationVariables
} from './__generated__/SingleSession.generated'
import { SESSION_SETTINGS_QUERY } from './index'

interface Props {
  session: Session
}

const SingleSession: React.FC<Props> = ({ session }) => {
  const [revokeSession, revokeSessionResult] = useMutation<
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
    <div className="border p-3 rounded-lg flex items-center justify-between">
      <div className="space-y-1">
        <div className="font-bold text-lg">User agent</div>
        <div className="text-gray-600 dark:text-gray-300">
          {session?.userAgent}
        </div>
        <div>
          <div className="text-sm">
            Created: {timeago.format(session?.createdAt)}
          </div>
          <div className="text-sm">
            Expires: {timeago.format(session?.expiresAt)}
          </div>
        </div>
      </div>
      <Button
        className="text-sm"
        size="sm"
        variant="danger"
        onClick={() =>
          revokeSession({ variables: { input: { id: session?.id } } })
        }
      >
        Revoke
      </Button>
    </div>
  )
}

export default SingleSession
