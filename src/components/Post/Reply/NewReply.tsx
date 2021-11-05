import { gql, useMutation } from '@apollo/client'
import { Button } from '@components/UI/Button'
import { Card, CardBody } from '@components/UI/Card'
import { ErrorMessage } from '@components/UI/ErrorMessage'
import { Form, useZodForm } from '@components/UI/Form'
import { Spinner } from '@components/UI/Spinner'
import { TextArea } from '@components/UI/TextArea'
import {
  NewReplyMutation,
  NewReplyMutationVariables,
  Post
} from '@graphql/types.generated'
import { ReplyIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { ERROR_MESSAGE } from 'src/constants'
import { object, string } from 'zod'

import Attachment from '../NewPost/Attachment'
import Attachments from '../SinglePost/Attachments'
import { REPLIES_QUERY } from './Replies'

const newReplySchema = object({
  body: string()
    .min(1, { message: '💬 Reply should not be empty' })
    .max(10000, { message: '💬 Reply should not exceed 10000 characters' })
})

interface Props {
  post: Post
}

const NewReply: React.FC<Props> = ({ post }) => {
  const [attachments, setAttachments] = useState<string[]>([])
  const [createPost, createPostResult] = useMutation<
    NewReplyMutation,
    NewReplyMutationVariables
  >(
    gql`
      mutation NewReply($input: CreatePostInput!) {
        createPost(input: $input) {
          id
          body
        }
      }
    `,
    {
      refetchQueries: [
        {
          query: REPLIES_QUERY,
          variables: { id: post?.id }
        }
      ],
      onError() {
        toast.error(ERROR_MESSAGE)
      },
      onCompleted() {
        form.reset()
        setAttachments([])
        toast.success('Replied successfully!')
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
                  body,
                  attachments:
                    attachments.length > 0 ? JSON.stringify(attachments) : null
                }
              }
            })
          }
        >
          <ErrorMessage
            title="Failed to create reply"
            error={createPostResult.error}
          />
          <TextArea {...form.register('body')} placeholder="Post your reply" />
          <div className="flex justify-between items-center">
            <Attachment
              attachments={attachments}
              setAttachments={setAttachments}
            />
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="danger"
                outline
                className="flex items-center gap-1.5"
                onClick={() => {
                  form.reset()
                }}
              >
                <div>Cancel</div>
              </Button>
              <Button
                type="submit"
                icon={
                  form.formState.isSubmitting ? (
                    <Spinner size="xs" />
                  ) : (
                    <ReplyIcon className="h-4 w-4" />
                  )
                }
              >
                Reply
              </Button>
            </div>
          </div>
          <Attachments
            attachments={attachments}
            setAttachments={setAttachments}
            isNew
          />
        </Form>
      </CardBody>
    </Card>
  )
}

export default NewReply
