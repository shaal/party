import { gql, useMutation } from '@apollo/client'
import { object, string } from 'zod'
import { CheckCircleIcon } from '@heroicons/react/outline'
import {
  NewPostMutation,
  NewPostMutationVariables
} from './__generated__/Post.generated'
import { Form, useZodForm } from '~/components/ui/Form'
import { ErrorMessage } from '~/components/ui/ErrorMessage'
import Button from '~/components/ui/Button'
import React from 'react'
import { Input } from '~/components/ui/Input'
import { TaskCheckbox } from '~/components/ui/TaskCheckbox'

const newPostSchema = object({
  body: string().min(1).max(1000)
})

const TaskType: React.FC = () => {
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
      update(cache, { data }) {
        if (!data?.createPost) return

        cache.modify({
          fields: {
            posts(existingPosts = []) {
              return [data.createPost, ...existingPosts]
            }
          }
        })
      },
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
      onSubmit={({ body }) =>
        createPost({ variables: { input: { body, type: 'TASK' } } })
      }
    >
      <ErrorMessage
        title="Failed to create task"
        error={createPostResult.error}
      />
      <div className="flex items-center mb-1.5 gap-2.5">
        <TaskCheckbox />
        <Input
          {...form.register('body')}
          placeholder="What have you achieved?"
        />
      </div>
      <div className="ml-auto">
        <Button type="submit" className="flex items-center gap-1.5">
          <CheckCircleIcon className="h-4 w-4" />
          <div>Create Task</div>
        </Button>
      </div>
    </Form>
  )
}

export default TaskType
