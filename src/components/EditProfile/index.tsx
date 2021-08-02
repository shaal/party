import { gql, useQuery } from '@apollo/client'
import { ErrorMessage } from '../ui/ErrorMessage'
import { GridLayout } from '../ui/GridLayout'
import { Shimmer } from '../ui/Shimmer'
import { ProfileForm, ProfileFormFragment } from './ProfileForm'
import { EditProfileQuery } from './__generated__/index.generated'

export function EditProfile() {
  const { data, loading, error } = useQuery<EditProfileQuery>(gql`
    query EditProfileQuery {
      me {
        ...ProfileForm_user
      }
    }

    ${ProfileFormFragment}
  `)

  return (
    <GridLayout>
      {loading && <Shimmer />}

      {error && (
        <ErrorMessage title="Failed to load your profile" error={error} />
      )}

      {data && data.me && <ProfileForm user={data.me} />}
    </GridLayout>
  )
}
