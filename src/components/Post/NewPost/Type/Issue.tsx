import { gql, useMutation } from '@apollo/client'
import Attachments from '@components/Post/SinglePost/Attachments'
import { Button } from '@components/UI/Button'
import { ErrorMessage } from '@components/UI/ErrorMessage'
import { Form, useZodForm } from '@components/UI/Form'
import { Input } from '@components/UI/Input'
import { Spinner } from '@components/UI/Spinner'
import {
  CreateIssueMutation,
  CreateIssueMutationVariables
} from '@graphql/types.generated'
import { ClipboardListIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { object, string } from 'zod'

import SelectTarget from '../SelectTarget'

const newIssueSchema = object({
  url: string().url({ message: '🐙 Invalid issue URL' })
})

const IssueType: React.FC = () => {
  const router = useRouter()
  const [attachments, setAttachments] = useState<string[]>([])
  const [selectedTarget, setSelectedTarget] = useState({
    targetId: '',
    targetType: ''
  })
  const [createIssue, createIssueResult] = useMutation<
    CreateIssueMutation,
    CreateIssueMutationVariables
  >(
    gql`
      mutation CreateIssue($input: CreatePostInput!) {
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
        toast.success('Issue has been posted successfully!')
        router.push(`/posts/${data?.createPost?.id}`)
      }
    }
  )

  const form = useZodForm({
    schema: newIssueSchema
  })

  return (
    <Form
      form={form}
      className="space-y-1"
      onSubmit={({ url }) =>
        createIssue({
          variables: {
            input: {
              body: url,
              type: 'ISSUE',
              attachments:
                attachments.length > 0 ? JSON.stringify(attachments) : null,
              targetId: selectedTarget.targetId,
              targetType: selectedTarget.targetType
            }
          }
        })
      }
    >
      <ErrorMessage
        title="Failed to create issue"
        error={createIssueResult.error}
      />
      <div className="mb-1.5">
        <Input {...form.register('url')} placeholder="GitHub issue URL" />
      </div>
      <div className="flex items-center justify-between">
        <div className="!-mx-2">
          <SelectTarget setSelectedTarget={setSelectedTarget} />
        </div>
        <Button
          type="submit"
          icon={
            form.formState.isSubmitting ? (
              <Spinner size="xs" />
            ) : (
              <ClipboardListIcon className="h-4 w-4" />
            )
          }
        >
          Post Issue
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

export default IssueType
