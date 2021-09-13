import { gql, useMutation } from '@apollo/client'
import {
  EyeIcon,
  EyeOffIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/outline'
import Markdown from 'markdown-to-jsx'
import { useRouter } from 'next/router'
import React, { Fragment } from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { object, string } from 'zod'

import { Button } from '~/components/ui/Button'
import { ErrorMessage } from '~/components/ui/ErrorMessage'
import { Form, useZodForm } from '~/components/ui/Form'
import { Input } from '~/components/ui/Input'
import { TextArea } from '~/components/ui/TextArea'
import { Tooltip } from '~/components/ui/Tooltip'

import Attachments from '../../SinglePost/Attachments'
import Attachment from '../Attachment'
import SelectProduct from '../SelectProduct'
import {
  NewPostMutation,
  NewPostMutationVariables
} from './__generated__/Post.generated'

const newPostSchema = object({
  title: string().min(1).max(255),
  body: string().min(1).max(10_000)
})

const QuestionType: React.FC = () => {
  const router = useRouter()
  const [attachments, setAttachments] = useState<string[]>([])
  const [selectedProduct, setSelectedProduct] = useState<string>('')
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
      onCompleted(data) {
        setAttachments([])
        form.reset()
        toast.success('Question has been created successfully!')
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
      onSubmit={({ title, body }) =>
        createPost({
          variables: {
            input: {
              title,
              body,
              type: 'QUESTION',
              attachments:
                attachments.length > 0 ? JSON.stringify(attachments) : null,
              productId: selectedProduct as string
            }
          }
        })
      }
    >
      <ErrorMessage
        title="Failed to create question"
        error={createPostResult.error}
      />
      {preview ? (
        <div className="text-xl post">
          <div className="font-bold mb-1">{form.getValues('title')}</div>
          <div className="prose">
            <Markdown options={{ wrapper: 'article' }}>
              {form.getValues('body')}
            </Markdown>
          </div>
        </div>
      ) : (
        <>
          <Input
            {...form.register('title')}
            className="mb-2"
            placeholder="What's the thing?"
          />
          <TextArea
            {...form.register('body')}
            placeholder="Ask anything about code"
          />
        </>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Attachment
            attachments={attachments}
            setAttachments={setAttachments}
          />
          <SelectProduct setSelectedProduct={setSelectedProduct} />
          <Tooltip content="Preview Markdown">
            <Button
              type="button"
              variant="success"
              size="sm"
              outline
              onClick={() => setPreview(!preview)}
            >
              {preview ? (
                <EyeOffIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </Button>
          </Tooltip>
        </div>
        <Button type="submit" className="flex items-center gap-1.5">
          <QuestionMarkCircleIcon className="h-4 w-4" />
          <div>Ask</div>
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

export default QuestionType
