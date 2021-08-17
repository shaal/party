import { gql, useMutation } from '@apollo/client'
import { HashtagIcon } from '@heroicons/react/outline'
import { boolean, object } from 'zod'

import { User } from '../../__generated__/schema.generated'
import { Card, CardBody } from '../ui/Card'
import { Form, useZodForm } from '../ui/Form'
import {
  ModUserMutation,
  ModUserMutationVariables
} from './__generated__/Mod.generated'

const modUserSchema = object({
  isVerified: boolean()
})

interface Props {
  user: User
}

const UserMod: React.FC<Props> = ({ user }) => {
  const [modUser, modUserResult] = useMutation<
    ModUserMutation,
    ModUserMutationVariables
  >(gql`
    mutation ModUserMutation($input: ModUserInput!) {
      modUser(input: $input) {
        id
        isVerified
      }
    }
  `)

  const form = useZodForm({
    schema: modUserSchema,
    defaultValues: {
      isVerified: user?.isVerified as boolean
    }
  })

  return (
    <Card className="mt-5 border-yellow-400 bg-yellow-100">
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
          onSubmit={({ isVerified }) =>
            modUser({
              variables: {
                input: {
                  userId: user?.id,
                  isVerified: isVerified as boolean
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
            <input id="flagUser" type="checkbox" />
            <label htmlFor="flagUser" className="text-red-500">
              Flag this user
            </label>
          </div>
        </Form>
      </CardBody>
    </Card>
  )
}

export default UserMod
