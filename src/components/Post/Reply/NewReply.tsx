import { ReplyIcon } from '@heroicons/react/outline'
import React from 'react'
import { object, string } from 'zod'

import { Post } from '~/__generated__/schema.generated'
import { Button } from '~/components/ui/Button'
import { Card, CardBody } from '~/components/ui/Card'
import { Form, useZodForm } from '~/components/ui/Form'
import { TextArea } from '~/components/ui/TextArea'

const newReplySchema = object({
  body: string().min(1).max(1000)
})

interface Props {
  post: Post
}

const NewReply: React.FC<Props> = ({ post }) => {
  const form = useZodForm({
    schema: newReplySchema
  })

  return (
    <Card>
      <CardBody>
        <Form
          form={form}
          className="space-y-1"
          onSubmit={({ body }) => {
            // WIP
          }}
        >
          <TextArea
            {...form.register('body')}
            placeholder="What's on your mind?"
          />
          <div className="flex ml-auto space-x-2">
            <Button
              type="button"
              outline
              className="flex items-center gap-1.5"
              onClick={() => {
                form.reset()
              }}
            >
              <div>Cancel</div>
            </Button>
            <Button type="submit" className="flex items-center gap-1.5">
              <ReplyIcon className="h-4 w-4" />
              <div>Reply</div>
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  )
}

export default NewReply
