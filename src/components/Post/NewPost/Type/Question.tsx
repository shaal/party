import { gql, useMutation } from '@apollo/client'
import Attachments from '@components/Post/SinglePost/Attachments'
import { Button } from '@components/ui/Button'
import { ErrorMessage } from '@components/ui/ErrorMessage'
import { Form, useZodForm } from '@components/ui/Form'
import { Input } from '@components/ui/Input'
import { Spinner } from '@components/ui/Spinner'
import { TextArea } from '@components/ui/TextArea'
import { Tooltip } from '@components/ui/Tooltip'
import {
  EyeIcon,
  EyeOffIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/outline'
import Markdown from 'markdown-to-jsx'
import mixpanel from 'mixpanel-browser'
import { useRouter } from 'next/router'
import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { object, string } from 'zod'

import Attachment from '../Attachment'
import SelectProduct from '../SelectProduct'
import {
  CreateQuestionMutation,
  CreateQuestionMutationVariables
} from './__generated__/Question.generated'

const newQuestionSchema = object({
  title: string()
    .min(1, { message: '❓ Title should not be empty' })
    .max(190, { message: '❓ Title should not exceed 190 characters' }),
  body: string()
    .min(1, { message: '❓ Question should not be empty' })
    .max(10000, { message: '❓ Question should not exceed 10000 characters' })
})

const QuestionType: React.FC = () => {
  const router = useRouter()
  const [attachments, setAttachments] = useState<string[]>([])
  const [selectedProduct, setSelectedProduct] = useState<string>('')
  const [preview, setPreview] = useState<boolean>(false)
  const [createQuestion, createQuestionResult] = useMutation<
    CreateQuestionMutation,
    CreateQuestionMutationVariables
  >(
    gql`
      mutation CreateQuestionMutation($input: CreatePostInput!) {
        createPost(input: $input) {
          id
          body
        }
      }
    `,
    {
      onError() {
        mixpanel.track('post.question.create.failed')
      },
      onCompleted(data) {
        setAttachments([])
        form.reset()
        toast.success('Question has been created successfully!')
        router.push(`/posts/${data?.createPost?.id}`)
        mixpanel.track('post.question.create.success')
      }
    }
  )

  const form = useZodForm({
    schema: newQuestionSchema
  })

  return (
    <Form
      form={form}
      className="space-y-1"
      onSubmit={({ title, body }) => {
        mixpanel.track('post.question.create')
        createQuestion({
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
      }}
    >
      <ErrorMessage
        title="Failed to create question"
        error={createQuestionResult.error}
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
              icon={
                preview ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )
              }
              onClick={() => setPreview(!preview)}
            />
          </Tooltip>
        </div>
        <Button
          type="submit"
          icon={
            form.formState.isSubmitting ? (
              <Spinner size="xs" />
            ) : (
              <QuestionMarkCircleIcon className="h-4 w-4" />
            )
          }
        >
          Ask
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
