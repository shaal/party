import { gql, useMutation } from '@apollo/client'
import { ReplyIcon } from '@heroicons/react/outline'
import React from 'react'
import { object, string } from 'zod'

import { Post } from '~/__generated__/schema.generated'
import { Button } from '~/components/ui/Button'
import { ErrorMessage } from '~/components/ui/ErrorMessage'
import { Form, useZodForm } from '~/components/ui/Form'
import { TextArea } from '~/components/ui/TextArea'

import { Card, CardBody } from '../../ui/Card'
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
      update(cache, { data }) {
        if (!data?.createReply) return

        cache.modify({
          fields: {
            replies(existingReplies = []) {
              return [data.createReply, ...existingReplies.edges]
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
          <div className="ml-auto">
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
