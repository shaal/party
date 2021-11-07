import { gql, useMutation } from '@apollo/client'
import { Button } from '@components/UI/Button'
import { Form, useZodForm } from '@components/UI/Form'
import { Input } from '@components/UI/Input'
import { Spinner } from '@components/UI/Spinner'
import {
  EditPasswordMutation,
  EditPasswordMutationVariables
} from '@graphql/types.generated'
import { CheckCircleIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import React from 'react'
import toast from 'react-hot-toast'
import { object, string } from 'zod'

const changePasswordSchema = object({
  currentPassword: string().min(4, {
    message: '👀 Password should atleast have 4 characters'
  }),
  newPassword: string().min(4, {
    message: '👀 Password should atleast have 4 characters'
  }),
  confirmNewPassword: string().min(4, {
    message: '👀 Password should atleast have 4 characters'
  })
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: '👀 Passwords do not match',
  path: ['confirmNewPassword']
})

const ChangePasswordForm: React.FC = () => {
  const router = useRouter()
  const [changePassword] = useMutation<
    EditPasswordMutation,
    EditPasswordMutationVariables
  >(
    gql`
      mutation EditPassword($input: ChangePasswordInput!) {
        changePassword(input: $input)
      }
    `,
    {
      onError(error) {
        toast.error(error.message)
      },
      onCompleted() {
        router.push('/login')
      }
    }
  )

  const form = useZodForm({ schema: changePasswordSchema })

  return (
    <Form
      form={form}
      className="space-y-4"
      onSubmit={({ currentPassword, newPassword }) =>
        changePassword({
          variables: { input: { currentPassword, newPassword } }
        })
      }
    >
      <Input
        label="Current Password"
        type="password"
        autoComplete="current-password"
        placeholder="••••••••••"
        {...form.register('currentPassword')}
      />
      <Input
        label="New Password"
        type="password"
        autoComplete="new-password"
        placeholder="••••••••••"
        {...form.register('newPassword')}
      />
      <Input
        label="Confirm New Password"
        type="password"
        autoComplete="new-password"
        placeholder="••••••••••"
        {...form.register('confirmNewPassword')}
      />
      <div className="ml-auto">
        <Button
          type="submit"
          icon={
            form.formState.isSubmitting ? (
              <Spinner size="xs" />
            ) : (
              <CheckCircleIcon className="h-4 w-4" />
            )
          }
        >
          Change Password
        </Button>
      </div>
    </Form>
  )
}

export default ChangePasswordForm
