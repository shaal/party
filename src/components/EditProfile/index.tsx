import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { ErrorMessage } from '../ui/ErrorMessage'
import { GridLayout } from '../GridLayout'
import { ProfileForm } from './ProfileForm'
import { EditProfileQuery } from './__generated__/index.generated'

export const EditProfile: React.FC = () => {
  const { data, error } = useQuery<EditProfileQuery>(gql`
    query EditProfileQuery {
      me {
        id
        username
      }
    }
  `)

  return (
    <GridLayout>
      {error && (
        <ErrorMessage title="Failed to load your profile" error={error} />
      )}

      {data && data.me && <ProfileForm user={data.me} />}
    </GridLayout>
  )
}
