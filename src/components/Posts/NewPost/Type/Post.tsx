import { useRouter } from 'next/router'
import { gql, useMutation } from '@apollo/client'
import { object, string } from 'zod'
import { PencilAltIcon } from '@heroicons/react/outline'
import {
  NewPostMutation,
  NewPostMutationVariables
} from './__generated__/Post.generated'
import { Form, useZodForm } from '~/components/ui/Form'
import { ErrorMessage } from '~/components/ui/ErrorMessage'
import { TextArea } from '~/components/ui/TextArea'
import Button from '~/components/ui/Button'
import React from 'react'

const newPostSchema = object({
  body: string().min(1).max(1000)
})

const PostType: React.FC = () => {
  const router = useRouter()
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
        // TODO: Clear Textarea
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
        createPost({ variables: { input: { body, type: 'POST' } } })
      }
    >
      <ErrorMessage
        title="Failed to create post"
        error={createPostResult.error}
      />
      <TextArea {...form.register('body')} placeholder="What's on your mind?" />
      <div className="ml-auto">
        <Button type="submit" className="flex items-center gap-1.5">
          <PencilAltIcon className="h-4 w-4" />
          <div>Post</div>
        </Button>
      </div>
    </Form>
  )
}

export default PostType
