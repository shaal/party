import { gql, useMutation } from '@apollo/client'
import { object, string } from 'zod'
import {
  EyeIcon,
  EyeOffIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/outline'
import {
  NewPostMutation,
  NewPostMutationVariables
} from './__generated__/Post.generated'
import { Form, useZodForm } from '~/components/ui/Form'
import { ErrorMessage } from '~/components/ui/ErrorMessage'
import Button from '~/components/ui/Button'
import React, { Fragment } from 'react'
import { Input } from '~/components/ui/Input'
import { TextArea } from '~/components/ui/TextArea'
import { useState } from 'react'
import Markdown from 'markdown-to-jsx'

const newPostSchema = object({
  title: string().min(1).max(255),
  body: string().min(1).max(10000)
})

const QuestionType: React.FC = () => {
  const [preview, setPreview] = useState<boolean>(false)
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
      onSubmit={({ title, body }) =>
        createPost({ variables: { input: { title, body, type: 'QUESTION' } } })
      }
    >
      <ErrorMessage
        title="Failed to create question"
        error={createPostResult.error}
      />
      {preview ? (
        <div className="text-lg post">
          <div className="font-bold mb-1">Hello, World!</div>
          <Markdown options={{ wrapper: 'article' }}>Hello, World!</Markdown>
        </div>
      ) : (
        <Fragment>
          <Input
            {...form.register('title')}
            className="mb-2"
            placeholder="What's the thing?"
          />
          <TextArea
            {...form.register('body')}
            placeholder="Ask anything about code"
          />
        </Fragment>
      )}
      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="success"
          outline
          onClick={() => setPreview(!preview)}
        >
          {preview ? (
            <EyeOffIcon className="h-5 w-5" />
          ) : (
            <EyeIcon className="h-5 w-5" />
          )}
        </Button>
        <Button type="submit" className="flex items-center gap-1.5">
          <QuestionMarkCircleIcon className="h-4 w-4" />
          <div>Ask</div>
        </Button>
      </div>
    </Form>
  )
}

export default QuestionType
