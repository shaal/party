import { gql, useMutation } from '@apollo/client'
import Attachments from '@components/Post/SinglePost/Attachments'
import { Button } from '@components/UI/Button'
import { ErrorMessage } from '@components/UI/ErrorMessage'
import { Form, useZodForm } from '@components/UI/Form'
import { Input } from '@components/UI/Input'
import { Spinner } from '@components/UI/Spinner'
import { TaskCheckbox } from '@components/UI/TaskCheckbox'
import { CheckCircleIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { object, string } from 'zod'

import Attachment from '../Attachment'
import SelectTarget from '../SelectTarget'
import {
  CreateTaskMutation,
  CreateTaskMutationVariables
} from './__generated__/Task.generated'

const newTaskSchema = object({
  body: string()
    .min(1, { message: '✅ Task should not be empty' })
    .max(10000, { message: '✅ Task should not exceed 10000 characters' })
})

const IssueType: React.FC = () => {
  const router = useRouter()
  const [attachments, setAttachments] = useState<string[]>([])
  const [selectedTarget, setSelectedTarget] = useState({
    targetId: '',
    targetType: ''
  })
  const [createTask, createTaskResult] = useMutation<
    CreateTaskMutation,
    CreateTaskMutationVariables
  >(
    gql`
      mutation CreateTaskMutation($input: CreatePostInput!) {
        createPost(input: $input) {
          id
          body
        }
      }
    `,
    {
      onCompleted(data) {
        setAttachments([])
        form.reset()
        toast.success('Task has been created successfully!')
        router.push(`/posts/${data?.createPost?.id}`)
      }
    }
  )

  const form = useZodForm({
    schema: newTaskSchema
  })

  return (
    <Form
      form={form}
      className="space-y-1"
      onSubmit={({ body, done }) =>
        createTask({
          variables: {
            input: {
              body,
              done,
              type: 'TASK',
              attachments:
                attachments.length > 0 ? JSON.stringify(attachments) : null,
              targetId: selectedTarget.targetId,
              targetType: selectedTarget.targetType
            }
          }
        })
      }
    >
      <ErrorMessage
        title="Failed to create task"
        error={createTaskResult.error}
      />
      <div className="flex items-center mb-1.5 gap-2.5">
        <TaskCheckbox {...form.register('done')} />
        <Input
          {...form.register('body')}
          placeholder="What have you achieved?"
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <Attachment
            attachments={attachments}
            setAttachments={setAttachments}
          />
          <SelectTarget setSelectedTarget={setSelectedTarget} />
        </div>
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
          Create Task
        </Button>
      </div>
      <Attachments
        attachments={attachments}
        setAttachments={setAttachments}
        isNew
      />
    </Form>
  )
}

export default IssueType
