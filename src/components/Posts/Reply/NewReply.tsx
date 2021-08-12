import { gql, useMutation } from '@apollo/client'
import { ReplyIcon } from '@heroicons/react/outline'
import React from 'react'
import { object, string } from 'zod'

import { Post } from '../../../__generated__/schema.generated'
import { Button } from '../../ui/Button'
import { Card, CardBody } from '../../ui/Card'
import { ErrorMessage } from '../../ui/ErrorMessage'
import { Form, useZodForm } from '../../ui/Form'
import { TextArea } from '../../ui/TextArea'
import {
  NewReplyMutation,
  NewReplyMutationVariables
} from './__generated__/NewReply.generated'
import { REPLIES_QUERY } from './Replies'

const newReplySchema = object({
  body: string().min(1).max(1000)
})

interface Props {
  post: Post
}

const NewReply: React.FC<Props> = ({ post }) => {
  const [createReply, createReplyResult] = useMutation<
    NewReplyMutation,
    NewReplyMutationVariables
  >(
    gql`
      mutation NewReplyMutation($input: CreateReplyInput!) {
        createReply(input: $input) {
          id
          body
        }
      }
    `,
    {
      refetchQueries: [
        {
          query: REPLIES_QUERY,
          variables: {
            where: {
              postId: post?.id
            }
          }
        }
      ],
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
            createReply({
              variables: {
                input: {
                  postId: post?.id,
                  body
                }
              }
            })
          }
        >
          <ErrorMessage
            title="Failed to create reply"
            error={createReplyResult.error}
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
