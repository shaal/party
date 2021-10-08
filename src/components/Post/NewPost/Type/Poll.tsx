import { gql, useMutation } from '@apollo/client'
import { Button } from '@components/ui/Button'
import { Card, CardBody } from '@components/ui/Card'
import { ErrorMessage } from '@components/ui/ErrorMessage'
import { Form, useZodForm } from '@components/ui/Form'
import { Input } from '@components/ui/Input'
import { Spinner } from '@components/ui/Spinner'
import { TextArea } from '@components/ui/TextArea'
import { Tooltip } from '@components/ui/Tooltip'
import {
  ChartBarIcon,
  CheckCircleIcon,
  MinusCircleIcon,
  PlusCircleIcon
} from '@heroicons/react/outline'
import mixpanel from 'mixpanel-browser'
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
    .max(190, { message: '🗳️ Poll body should not exceed 190 characters' })
})

const PollType: React.FC = () => {
  const router = useRouter()
  const [polls, setPolls] = useState([{ title: '' }, { title: '' }])
  const [pollError, setPollError] = useState<boolean>(false)
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

  const addPoll = () => {
    setPolls([...polls, { title: '' }])
    calculateError()
  }

  const removePoll = (i: number) => {
    let newPolls = [...polls]
    newPolls.splice(i, 1)
    setPolls(newPolls)
    calculateError()
  }

  const handleChange = (i: any, e: any) => {
    let newPolls = [...polls]
    // @ts-ignore
    newPolls[i][e.target.name] = e.target.value
    setPolls(newPolls)
  }

  const calculateError = () => {
    if (!polls[0].title || !polls[1].title) {
      setPollError(true)
      return true
    } else {
      setPollError(false)
      return false
    }
  }

  return (
    <Form
      form={form}
      className="space-y-1"
      onSubmit={({ body }) => {
        if (calculateError()) return false
        mixpanel.track('post.poll.create')
        createPoll({
          variables: {
            input: {
              body,
              polls: JSON.stringify(polls) as string,
              type: 'POLL',
              productId: selectedProduct as string
            }
          }
        })
      }}
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
            {polls.map((element, index) => (
              <div key={index} className="flex item-center space-x-3">
                <Input
                  value={element.title}
                  name="title"
                  onChange={(e) => handleChange(index, e)}
                  prefix={<CheckCircleIcon className="h-5 w-5" />}
                  placeholder={`Choice ${index + 1}`}
                />
                {index > 1 ? (
                  <button type="button" onClick={() => removePoll(index)}>
                    <Tooltip content="Remove">
                      <MinusCircleIcon className="h-5 w-5 text-red-500" />
                    </Tooltip>
                  </button>
                ) : null}
              </div>
            ))}
            {polls.length < 4 && (
              <Button
                type="button"
                variant="success"
                className="text-sm"
                onClick={() => addPoll()}
                icon={<PlusCircleIcon className="h-5 w-4" />}
                outline
              >
                New answer
              </Button>
            )}
            {pollError && (
              <div className="text-sm text-red-500 font-bold">
                🗳️ Choice 1 and Choice 2 is required
              </div>
            )}
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
