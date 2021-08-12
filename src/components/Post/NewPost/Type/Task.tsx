import { gql, useMutation } from '@apollo/client'
import { CheckCircleIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import { boolean, object, string } from 'zod'

import { HOME_FEED_QUERY } from 'src/components/Home/Feed'
import { Button } from 'src/components/ui/Button'
import { ErrorMessage } from 'src/components/ui/ErrorMessage'
import { Form, useZodForm } from 'src/components/ui/Form'
import { Input } from 'src/components/ui/Input'
import { TaskCheckbox } from 'src/components/ui/TaskCheckbox'

import Attachments from '../../SinglePost/Attachments'
import Attachment from '../Attachment'
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
        form.reset()
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
              attachments: JSON.stringify(attachments)
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
        <Attachment attachments={attachments} setAttachments={setAttachments} />
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
