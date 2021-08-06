import { gql, useQuery } from '@apollo/client'
import React from 'react'

import { GridLayout } from '../GridLayout'
import { ErrorMessage } from '../ui/ErrorMessage'
import { EditProfileQuery } from './__generated__/index.generated'
import ProfileForm from './ProfileForm'

const EditProfile: React.FC = () => {
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

export default EditProfile
