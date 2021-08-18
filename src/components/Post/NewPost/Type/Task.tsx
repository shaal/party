import { gql, useMutation } from '@apollo/client'
import { CheckCircleIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { boolean, object, string } from 'zod'

import { HOME_FEED_QUERY } from '../../../Home/Feed'
import { Button } from '../../../ui/Button'
import { ErrorMessage } from '../../../ui/ErrorMessage'
import { Form, useZodForm } from '../../../ui/Form'
import { Input } from '../../../ui/Input'
import { TaskCheckbox } from '../../../ui/TaskCheckbox'
import Attachments from '../../SinglePost/Attachments'
import Attachment from '../Attachment'
import SelectProduct from '../SelectProduct'
import {
  NewPostMutation,
  NewPostMutationVariables
} from './__generated__/Post.generated'

const newPostSchema = object({
  body: string().min(1).max(1000),
  done: boolean().default(true)
})

const TaskType: React.FC = () => {
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
      refetchQueries: [{ query: HOME_FEED_QUERY }],
      onCompleted() {
        setAttachments([])
        form.reset()
        toast.success('Task has been created successfully!')
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
          <CheckCircleIcon className="h-4 w-4" />
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
