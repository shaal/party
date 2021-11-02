import { gql, useMutation } from '@apollo/client'
import Attachments from '@components/Post/SinglePost/Attachments'
import { Button } from '@components/UI/Button'
import { ErrorMessage } from '@components/UI/ErrorMessage'
import { Form, useZodForm } from '@components/UI/Form'
import { Input } from '@components/UI/Input'
import { Spinner } from '@components/UI/Spinner'
import { ClipboardListIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { object, string } from 'zod'

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
      onSubmit={({ body }) =>
        createTask({
          variables: {
            input: {
              body,
              type: 'ISSUE',
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
      <div className="mb-1.5">
        <Input {...form.register('body')} placeholder="GitHub issue URL" />
      </div>
      <div className="flex items-center justify-between">
        <div className="!-mx-2">
          <SelectTarget setSelectedTarget={setSelectedTarget} />
        </div>
        <Button
          type="submit"
          icon={
            form.formState.isSubmitting ? (
              <Spinner size="xs" />
            ) : (
              <ClipboardListIcon className="h-4 w-4" />
            )
          }
        >
          Post Issue
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
