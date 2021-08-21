import { gql, useMutation } from '@apollo/client'
import { Button } from '~/components/ui/Button'
import { Card, CardBody } from '~/components/ui/Card'
import { Form, useZodForm } from '~/components/ui/Form'
import { TextArea } from '~/components/ui/TextArea'
import { HashtagIcon } from '@heroicons/react/outline'
import { object, string } from 'zod'

import { Topic } from '../../__generated__/schema.generated'
import {
  ModTopicMutation,
  ModTopicMutationVariables
} from './__generated__/Mod.generated'

const modTopicSchema = object({
  description: string().max(1000).nullable()
})

interface Props {
  topic: Topic
}

const TopicMod: React.FC<Props> = ({ topic }) => {
  const [modTopic] = useMutation<
    ModTopicMutation,
    ModTopicMutationVariables
  >(gql`
    mutation ModTopicMutation($input: EditTopicInput!) {
      modTopic(input: $input) {
        id
        description
      }
    }
  `)

  const form = useZodForm({
    schema: modTopicSchema,
    defaultValues: {
      description: topic.description
    }
  })

  return (
    <Card className="mt-5 border-yellow-400 bg-yellow-100">
      <CardBody>
        <div className="font-bold text-lg">Details</div>
        <div className="space-y-1 mt-3 text-sm">
          <div className="flex items-center gap-1">
            <HashtagIcon className="h-4 w-4" />
            <span className="font-mono font-bold">{topic?.id}</span>
          </div>
        </div>
        <div className="border-t border-yellow-400 my-3"></div>
        <div className="font-bold text-lg">Flags</div>
        <div className="space-y-1.5 mt-3 text-sm font-bold">
          <Form
            form={form}
            className="space-y-4"
            onSubmit={({ description }) =>
              modTopic({
                variables: {
                  input: {
                    id: topic?.id,
                    description: description as string
                  }
                }
              })
            }
          >
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
