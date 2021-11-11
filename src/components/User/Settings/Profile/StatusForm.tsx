import { gql, useMutation } from '@apollo/client'
import { Button } from '@components/UI/Button'
import { Card, CardBody } from '@components/UI/Card'
import { Form, useZodForm } from '@components/UI/Form'
import { Input } from '@components/UI/Input'
import { Spinner } from '@components/UI/Spinner'
import {
  EditStatusMutation,
  EditStatusMutationVariables,
  User
} from '@graphql/types.generated'
import { CheckCircleIcon } from '@heroicons/react/outline'
import React from 'react'
import toast from 'react-hot-toast'
import { object, string } from 'zod'

const editStatusSchema = object({
  emoji: string(),
  text: string().max(50, {
    message: '💝 Status text should not exceed 50 characters'
  })
})

interface Props {
  currentUser: User
}

const SUCCESS_MESSAGE = 'Status successfully updated!'

const StatusSettingsForm: React.FC<Props> = ({ currentUser }) => {
  const [editStatus] = useMutation<
    EditStatusMutation,
    EditStatusMutationVariables
  >(
    gql`
      mutation EditStatus($input: EditStatusInput!) {
        editStatus(input: $input) {
          emoji
          text
        }
      }
    `,
    {
      onError(error) {
        toast.error(error.message)
      },
      onCompleted() {
        toast.success(SUCCESS_MESSAGE)
      }
    }
  )

  const form = useZodForm({
    schema: editStatusSchema,
    defaultValues: {
      emoji: currentUser?.status?.emoji,
      text: currentUser?.status?.text
    }
  })

  return (
    <Card className="mb-4">
      <CardBody>
        <Form
          form={form}
          className="space-y-4"
          onSubmit={({ emoji, text }) =>
            editStatus({
              variables: {
                input: { emoji, text }
              }
            })
          }
        >
          <Input
            label="Emoji"
            type="text"
            placeholder="💝"
            {...form.register('emoji')}
          />
          <Input
            label="Status"
            type="text"
            placeholder="Working with Filip"
            {...form.register('text')}
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
              Save
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  )
}

export default StatusSettingsForm
