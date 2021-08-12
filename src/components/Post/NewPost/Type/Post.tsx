import { gql, useMutation } from '@apollo/client'
import { PencilAltIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import { object, string } from 'zod'

import { HOME_FEED_QUERY } from '../../../Home/Feed'
import { Button } from '../../../ui/Button'
import { ErrorMessage } from '../../../ui/ErrorMessage'
import { Form, useZodForm } from '../../../ui/Form'
import { TextArea } from '../../../ui/TextArea'
import Attachments from '../../SinglePost/Attachments'
import Attachment from '../Attachment'
import SelectProduct from '../SelectProduct'
import {
  NewPostMutation,
  NewPostMutationVariables
} from './__generated__/Post.generated'

const newPostSchema = object({
  body: string().min(1).max(1000)
})

const PostType: React.FC = () => {
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
      refetchQueries: [
        {
          query: HOME_FEED_QUERY,
          variables: {
            where: {
              onlyFollowing: true
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
    schema: newPostSchema
  })

  return (
    <Form
      form={form}
      className="space-y-1"
      onSubmit={({ body }) =>
        createPost({
          variables: {
            input: {
              body,
              type: 'POST',
              attachments: JSON.stringify(attachments)
            }
          }
        })
      }
    >
      <ErrorMessage
        title="Failed to create post"
        error={createPostResult.error}
      />
      <TextArea {...form.register('body')} placeholder="What's on your mind?" />
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <Attachment
            attachments={attachments}
            setAttachments={setAttachments}
          />
          <SelectProduct setSelectedProduct={setSelectedProduct} />
        </div>
        <Button type="submit" className="flex items-center gap-1.5">
          <PencilAltIcon className="h-4 w-4" />
          <div>Post</div>
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

export default PostType
