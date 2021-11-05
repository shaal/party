import { gql, useMutation } from '@apollo/client'
import Attachments from '@components/Post/SinglePost/Attachments'
import { Button } from '@components/UI/Button'
import { ErrorMessage } from '@components/UI/ErrorMessage'
import { Form, useZodForm } from '@components/UI/Form'
import { Spinner } from '@components/UI/Spinner'
import { TextArea } from '@components/UI/TextArea'
import {
  CreatePostMutation,
  CreatePostMutationVariables
} from '@graphql/types.generated'
import { PencilAltIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { object, string } from 'zod'

import Attachment from '../Attachment'
import SelectTarget from '../SelectTarget'

const newPostSchema = object({
  body: string()
    .min(1, { message: '📜 Post should not be empty' })
    .max(10000, { message: '📜 Post should not exceed 10000 characters' })
})

const PostType: React.FC = () => {
  const router = useRouter()
  const [attachments, setAttachments] = useState<string[]>([])
  const [selectedTarget, setSelectedTarget] = useState({
    targetId: '',
    targetType: ''
  })
  const [createPost, createPostResult] = useMutation<
    CreatePostMutation,
    CreatePostMutationVariables
  >(
    gql`
      mutation CreatePost($input: CreatePostInput!) {
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
        toast.success('Post has been created successfully!')
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
      onSubmit={({ body }) =>
        createPost({
          variables: {
            input: {
              body,
              type: 'POST',
              attachments:
                attachments.length > 0 ? JSON.stringify(attachments) : null,
              targetId: selectedTarget.targetId,
              targetType: selectedTarget.targetType
            }
          }
        })
      }
    >
      <ErrorMessage error={createPostResult.error} className="mb-1" />
      <TextArea {...form.register('body')} placeholder="What's on your mind?" />
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <Attachment
            attachments={attachments}
            setAttachments={setAttachments}
          />
          <SelectTarget setSelectedTarget={setSelectedTarget} />
        </div>
        <Button
          type="submit"
          icon={
            form.formState.isSubmitting ? (
              <Spinner size="xs" />
            ) : (
              <PencilAltIcon className="h-4 w-4" />
            )
          }
        >
          Post
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
