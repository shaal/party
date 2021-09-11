import React from 'react'
import { object, string } from 'zod'

import { Button } from '~/components/ui/Button'
import { ErrorMessage } from '~/components/ui/ErrorMessage'
import { Form, useZodForm } from '~/components/ui/Form'
import { Input } from '~/components/ui/Input'

const createBadgeSchema = object({
  name: string().max(100),
  icon: string().max(100)
})

const NewBadge: React.FC = () => {
  const form = useZodForm({
    schema: createBadgeSchema
  })

  return (
    <Form form={form} className="space-y-4" onSubmit={() => {}}>
      <ErrorMessage title="Error creating badge" />
      <Input
        label="Give your badge a name"
        type="text"
        placeholder="Typescript Dev"
        {...form.register('name')}
      />
      <Input
        label="Set your badge icon"
        type="text"
        placeholder="https://icon.com/icon.png"
        {...form.register('icon')}
      />
      <div className="ml-auto pt-3">
        <Button type="submit">Create badge</Button>
      </div>
    </Form>
  )
}

export default NewBadge
