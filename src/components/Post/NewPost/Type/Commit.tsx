import { gql, useMutation } from '@apollo/client'
import { Button } from '@components/UI/Button'
import { ErrorMessage } from '@components/UI/ErrorMessage'
import { Form, useZodForm } from '@components/UI/Form'
import { Input } from '@components/UI/Input'
import { Spinner } from '@components/UI/Spinner'
import { DocumentAddIcon } from '@heroicons/react/outline'
import mixpanel from 'mixpanel-browser'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { object, string } from 'zod'

import SelectTarget from '../SelectTarget'
import {
  CreateCommitMutation,
  CreateCommitMutationVariables
} from './__generated__/Commit.generated'

const newCommitSchema = object({
  url: string()
    .regex(
      /(?:http:\/\/)?(?:www\.)?github\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/,
      { message: '🐙 Enter the valid GitHub Commit URL' }
    )
    .url({ message: '🐙 Enter the valid GitHub Commit URL' })
    .min(1, { message: '🐙 Commit URL should not be empty' })
    .max(10000, {
      message: '🐙 Commit URL should not exceed 10000 characters'
    })
})

const CommitType: React.FC = () => {
  const router = useRouter()
  const [selectedTarget, setSelectedTarget] = useState({
    targetId: '',
    targetType: ''
  })
  const [createCommit, createCommitResult] = useMutation<
    CreateCommitMutation,
    CreateCommitMutationVariables
  >(
    gql`
      mutation CreateCommitMutation($input: CreatePostInput!) {
        createPost(input: $input) {
          id
          body
        }
      }
    `,
    {
      onError() {
        mixpanel.track('post.commit.create.failed')
      },
      onCompleted(data) {
        form.reset()
        toast.success('Git Commit has been posted successfully!')
        router.push(`/posts/${data?.createPost?.id}`)
        mixpanel.track('post.commit.create.success')
      }
    }
  )

  const form = useZodForm({
    schema: newCommitSchema
  })

  return (
    <Form
      form={form}
      className="space-y-1"
      onSubmit={({ url }) => {
        mixpanel.track('post.commit.create')
        createCommit({
          variables: {
            input: {
              body: url,
              type: 'COMMIT',
              targetId: selectedTarget.targetId,
              targetType: selectedTarget.targetType
            }
          }
        })
      }}
    >
      <ErrorMessage
        title="Failed to create commit"
        error={createCommitResult.error}
      />
      <div className="flex items-center mb-1.5 gap-2.5">
        <Input {...form.register('url')} placeholder="Git Commit URL" />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <SelectTarget setSelectedTarget={setSelectedTarget} />
        </div>
        <Button
          type="submit"
          icon={
            form.formState.isSubmitting ? (
              <Spinner size="xs" />
            ) : (
              <DocumentAddIcon className="h-4 w-4" />
            )
          }
        >
          Post Commit
        </Button>
      </div>
    </Form>
  )
}

export default CommitType
