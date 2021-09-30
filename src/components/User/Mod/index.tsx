import { gql, useMutation } from '@apollo/client'
import Slug from '@components/shared/Slug'
import { Button } from '@components/ui/Button'
import { Card, CardBody } from '@components/ui/Card'
import { Form, useZodForm } from '@components/ui/Form'
import { Modal } from '@components/ui/Modal'
import { HashtagIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { User } from 'src/__generated__/schema.generated'
import { boolean, object } from 'zod'

import {
  ModUserMutation,
  ModUserMutationVariables
} from './__generated__/index.generated'
import UpdateBadges from './UpdateBadges'

const modUserSchema = object({
  isVerified: boolean(),
  isStaff: boolean(),
  spammy: boolean()
})

interface Props {
  user: User
}

const UserMod: React.FC<Props> = ({ user }) => {
  const [showUpdateBadgesModal, setShowUpdateBadgesModal] =
    useState<boolean>(false)
  const [modUser] = useMutation<ModUserMutation, ModUserMutationVariables>(
    gql`
      mutation ModUserMutation($input: ModUserInput!) {
        modUser(input: $input) {
          id
          isVerified
          isStaff
          spammy
        }
      }
    `,
    {
      onError() {
        toast.error('Something went wrong!')
      },
      onCompleted() {
        toast.success('User staff settings updated!')
      }
    }
  )

  const form = useZodForm({
    schema: modUserSchema,
    defaultValues: {
      isVerified: user?.isVerified as boolean,
      isStaff: user?.isStaff as boolean,
      spammy: user?.spammy as boolean
    }
  })

  return (
    <>
      <Card className="mt-5 border-yellow-400 !bg-yellow-300 !bg-opacity-20">
        <CardBody>
          <div className="font-bold text-lg">Details</div>
          <div className="space-y-1 mt-3 text-sm">
            <div className="flex items-center gap-1">
              <HashtagIcon className="h-4 w-4" />
              <span className="font-mono font-bold">{user?.id}</span>
            </div>
          </div>
          <div className="border-t border-yellow-400 my-3"></div>
          <div className="font-bold text-lg">Flags</div>
          <Form
            form={form}
            className="space-y-1.5 mt-3 text-sm font-bold"
            onSubmit={({ isVerified, isStaff, spammy }) =>
              modUser({
                variables: {
                  input: {
                    userId: user?.id,
                    isVerified: isVerified as boolean,
                    isStaff: isStaff as boolean,
                    spammy: spammy as boolean
                  }
                }
              })
            }
          >
            <div className="flex items-center gap-2">
              <input
                id="verifyUser"
                type="checkbox"
                {...form.register('isVerified')}
              />
              <label htmlFor="verifyUser">Verify the user</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                id="staffUser"
                type="checkbox"
                {...form.register('isStaff')}
              />
              <label htmlFor="staffUser">Make as staff</label>
            </div>
            {!user?.isStaff && (
              <div className="flex items-center gap-2">
                <input
                  id="spammyUser"
                  type="checkbox"
                  {...form.register('spammy')}
                />
                <label htmlFor="spammyUser" className="text-red-500">
                  Mark as spammy
                </label>
              </div>
            )}
            <div className="pt-2 space-x-2">
              <Button
                type="button"
                variant="success"
                onClick={() => setShowUpdateBadgesModal(!showUpdateBadgesModal)}
              >
                Update Badges
              </Button>
              <Button type="submit">
                {form.formState.isSubmitting ? 'Updating...' : 'Update'}
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
      {showUpdateBadgesModal && (
        <Modal
          onClose={() => setShowUpdateBadgesModal(!showUpdateBadgesModal)}
          title={
            <div className="flex items-center space-x-1.5">
              <div>Update badges for</div>
              <Slug slug={user?.username} prefix="@" />
            </div>
          }
          show={showUpdateBadgesModal}
        >
          <UpdateBadges />
        </Modal>
      )}
    </>
  )
}

export default UserMod