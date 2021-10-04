import { gql, useMutation } from '@apollo/client'
import { Button } from '@components/ui/Button'
import { Card, CardBody } from '@components/ui/Card'
import { ErrorMessage } from '@components/ui/ErrorMessage'
import { Form, useZodForm } from '@components/ui/Form'
import { Input } from '@components/ui/Input'
import { Spinner } from '@components/ui/Spinner'
import { TextArea } from '@components/ui/TextArea'
import { ChartBarIcon, CheckCircleIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { object, string } from 'zod'

import SelectProduct from '../SelectProduct'
import {
  CreatePollMutation,
  CreatePollMutationVariables
} from './__generated__/Poll.generated'

const newPollSchema = object({
  body: string()
    .min(1, { message: '🗳️ Poll body should not be empty' })
    .max(190, { message: '🗳️ Poll body should not exceed 190 characters' }),
  choice1: string().min(1).max(25),
  choice2: string().min(1).max(25),
  choice3: string().max(25).optional(),
  choice4: string().max(25).optional()
})

const PollType: React.FC = () => {
  const router = useRouter()
  const [selectedProduct, setSelectedProduct] = useState<string>('')
  const [createPoll, createPollResult] = useMutation<
    CreatePollMutation,
    CreatePollMutationVariables
  >(
    gql`
      mutation CreatePollMutation($input: CreatePostInput!) {
        createPost(input: $input) {
          id
        }
      }
    `,
    {
      onCompleted(data) {
        form.reset()
        toast.success('Poll has been created successfully!')
        router.push(`/posts/${data?.createPost?.id}`)
      }
    }
  )

  const form = useZodForm({
    schema: newPollSchema
  })

  return (
    <Form
      form={form}
      className="space-y-1"
      onSubmit={({ body }) =>
        createPoll({
          variables: {
            input: {
              body,
              type: 'POLL',
              productId: selectedProduct as string
            }
          }
        })
      }
    >
      <ErrorMessage
        title="Failed to create poll"
        error={createPollResult.error}
      />
      <div className="mb-1.5 space-y-3">
        <TextArea
          {...form.register('body')}
          placeholder="Tell as about your poll"
        />
        <Card className="!bg-gray-100 dark:!bg-gray-800">
          <CardBody className="space-y-2">
            <div>
              <Input
                prefix={<CheckCircleIcon className="h-5 w-5" />}
                {...form.register('choice1')}
                placeholder="Choice 1*"
              />
            </div>
            <div>
              <Input
                prefix={<CheckCircleIcon className="h-5 w-5" />}
                {...form.register('choice2')}
                placeholder="Choice 2*"
              />
            </div>
            <div>
              <Input
                prefix={<CheckCircleIcon className="h-5 w-5" />}
                {...form.register('choice3')}
                placeholder="Choice 3"
              />
            </div>
            <div>
              <Input
                prefix={<CheckCircleIcon className="h-5 w-5" />}
                {...form.register('choice4')}
                placeholder="Choice 4"
              />
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <SelectProduct setSelectedProduct={setSelectedProduct} />
        </div>
        <Button
          type="submit"
          icon={
            form.formState.isSubmitting ? (
              <Spinner size="xs" />
            ) : (
              <ChartBarIcon className="h-4 w-4" />
            )
          }
        >
          Create Poll
        </Button>
      </div>
    </Form>
  )
}

export default PollType
