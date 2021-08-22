import { gql, useMutation } from '@apollo/client'
import { ReplyIcon } from '@heroicons/react/outline'
import React from 'react'
import { object, string } from 'zod'

import { Post } from '~/__generated__/schema.generated'
import { Button } from '~/components/ui/Button'
import { Card, CardBody } from '~/components/ui/Card'
import { ErrorMessage } from '~/components/ui/ErrorMessage'
import { Form, useZodForm } from '~/components/ui/Form'
import { TextArea } from '~/components/ui/TextArea'

import {
  NewReplyMutation,
  NewReplyMutationVariables
} from './__generated__/NewReply.generated'

const newReplySchema = object({
  body: string().min(1).max(1000)
})

interface Props {
  post: Post
}

const NewReply: React.FC<Props> = ({ post }) => {
  const [createPost, createPostResult] = useMutation<
    NewReplyMutation,
    NewReplyMutationVariables
  >(
    gql`
      mutation NewReplyMutation($input: CreatePostInput!) {
        createPost(input: $input) {
          id
          body
        }
      }
    `,
    {
      onCompleted() {
        form.reset()
      }
    }
  )

  const form = useZodForm({
    schema: newReplySchema
  })

  return (
    <Card>
      <CardBody>
        <Form
          form={form}
          className="space-y-1"
          onSubmit={({ body }) =>
            createPost({
              variables: {
                input: {
                  parentId: post?.id,
                  type: 'REPLY',
                  body
                }
              }
            })
          }
        >
          <ErrorMessage
            title="Failed to create reply"
            error={createPostResult.error}
          />
          <TextArea
            {...form.register('body')}
            placeholder="What's on your mind?"
          />
          <div className="flex ml-auto space-x-2">
            <Button
              type="button"
              outline
              className="flex items-center gap-1.5"
              onClick={() => {
                form.reset()
              }}
            >
              <div>Cancel</div>
            </Button>
            <Button type="submit" className="flex items-center gap-1.5">
              <ReplyIcon className="h-4 w-4" />
              <div>Reply</div>
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  )
}

export default NewReply
