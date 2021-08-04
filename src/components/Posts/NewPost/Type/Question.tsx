import { useRouter } from 'next/router'
import { gql, useMutation } from '@apollo/client'
import { object, string } from 'zod'
import { QuestionMarkCircleIcon } from '@heroicons/react/outline'
import {
  NewPostMutation,
  NewPostMutationVariables
} from './__generated__/Post.generated'
import { Form, useZodForm } from '~/components/ui/Form'
import { ErrorMessage } from '~/components/ui/ErrorMessage'
import Button from '~/components/ui/Button'
import React from 'react'
import { Input } from '~/components/ui/Input'
import { TextArea } from '~/components/ui/TextArea'

const newPostSchema = object({
  title: string().min(1),
  body: string().min(1)
})

export const QuestionType: React.FC = () => {
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
        createPost({ variables: { input: { body, type: 'QUESTION' } } })
      }
    >
      <ErrorMessage
        title="Failed to create question"
        error={createPostResult.error}
      />
      <Input
        {...form.register('title')}
        className="mb-2"
        placeholder="What's the thing?"
      />
      <TextArea
        {...form.register('body')}
        placeholder="Ask anything about code"
      />
      <div className="ml-auto">
        <Button type="submit" className="flex items-center gap-1.5">
          <QuestionMarkCircleIcon className="h-4 w-4" />
          <div>Ask</div>
        </Button>
      </div>
    </Form>
  )
}
