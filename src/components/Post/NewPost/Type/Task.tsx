import { gql, useMutation } from '@apollo/client'
import Attachments from '@components/Post/SinglePost/Attachments'
import { Button } from '@components/ui/Button'
import { ErrorMessage } from '@components/ui/ErrorMessage'
import { Form, useZodForm } from '@components/ui/Form'
import { Input } from '@components/ui/Input'
import { Spinner } from '@components/ui/Spinner'
import { TaskCheckbox } from '@components/ui/TaskCheckbox'
import { CheckCircleIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { boolean, object, string } from 'zod'

import Attachment from '../Attachment'
import SelectProduct from '../SelectProduct'
import {
  NewPostMutation,
  NewPostMutationVariables
} from './__generated__/Post.generated'

const newPostSchema = object({
  body: string()
    .min(1, { message: '✅ Task should not be empty' })
    .max(10000, { message: '✅ Task should not exceed 10000 characters' }),
  done: boolean().default(true)
})

const TaskType: React.FC = () => {
  const router = useRouter()
  const [attachments, setAttachments] = useState<string[]>([])
  const [selectedProduct, setSelectedProduct] = useState<string>('')
  const [createPost, createPostResult] = useMutation<
    NewPostMutation,
    NewPostMutationVariables
  >(
    gql`
      mutation NewPostMutation($input: CreatePostInput!) {
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
    schema: newPostSchema
  })

  return (
    <Form
      form={form}
      className="space-y-1"
      onSubmit={({ body, done }) =>
        createPost({
          variables: {
            input: {
              body,
              done,
              type: 'TASK',
              attachments:
                attachments.length > 0 ? JSON.stringify(attachments) : null,
              productId: selectedProduct as string
            }
          }
        })
      }
    >
      <ErrorMessage
        title="Failed to create task"
        error={createPostResult.error}
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
          <SelectProduct setSelectedProduct={setSelectedProduct} />
        </div>
        <Button type="submit" className="flex items-center gap-1.5">
          {form.formState.isSubmitting ? (
            <Spinner size="xs" />
          ) : (
            <CheckCircleIcon className="h-4 w-4" />
          )}
          <div>Create Task</div>
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

export default TaskType
