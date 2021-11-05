import { gql, useMutation } from '@apollo/client'
import { Button } from '@components/UI/Button'
import { Card, CardBody } from '@components/UI/Card'
import { Form, useZodForm } from '@components/UI/Form'
import { TextArea } from '@components/UI/TextArea'
import {
  ModTopicMutation,
  ModTopicMutationVariables,
  Topic
} from '@graphql/types.generated'
import { HashtagIcon } from '@heroicons/react/outline'
import toast from 'react-hot-toast'
import { ERROR_MESSAGE } from 'src/constants'
import { boolean, object, string } from 'zod'

const modTopicSchema = object({
  description: string()
    .max(1000, { message: '📜 Description should not exceed 1000 characters' })
    .nullable(),
  featuredAt: boolean()
})

interface Props {
  topic: Topic
}

const TopicMod: React.FC<Props> = ({ topic }) => {
  const [modTopic] = useMutation<ModTopicMutation, ModTopicMutationVariables>(
    gql`
      mutation ModTopic($input: ModTopicInput!) {
        modTopic(input: $input) {
          id
          description
          featuredAt
        }
      }
    `,
    {
      onError() {
        toast.error(ERROR_MESSAGE)
      },
      onCompleted() {
        form.reset()
        toast.success('Topic staff settings updated!')
      }
    }
  )

  const form = useZodForm({
    schema: modTopicSchema,
    defaultValues: {
      description: topic?.description,
      featuredAt: topic?.featuredAt ? true : false
    }
  })

  return (
    <Card className="mt-5 border-yellow-400 !bg-yellow-300 !bg-opacity-20">
      <CardBody>
        <div className="font-bold text-lg">Details</div>
        <div className="space-y-1 mt-3 text-sm">
          <div className="flex items-center gap-1">
            <HashtagIcon className="h-4 w-4" />
            <span className="font-mono font-bold">{topic?.id}</span>
          </div>
        </div>
        <div className="border-t border-yellow-400 my-3" />
        <div className="font-bold text-lg">Flags</div>
        <div className="space-y-1.5 mt-3 text-sm font-bold">
          <Form
            form={form}
            className="space-y-4"
            onSubmit={({ description, featuredAt }) =>
              modTopic({
                variables: {
                  input: {
                    id: topic?.id,
                    description: description as string,
                    featuredAt: featuredAt ? true : false
                  }
                }
              })
            }
          >
            {/* TODO: Fix checkbox not update problem */}
            <div className="flex items-center gap-2">
              <input
                id="featuredAt"
                type="checkbox"
                {...form.register('featuredAt')}
              />
              <label htmlFor="featuredAt">Feature this topic</label>
            </div>
            <TextArea
              label="Description"
              placeholder="Explain what's the topic about"
              {...form.register('description')}
            />
            {/* TODO: Image Upload */}
            <div>
              <Button type="submit">Update</Button>
            </div>
          </Form>
        </div>
      </CardBody>
    </Card>
  )
}

export default TopicMod
