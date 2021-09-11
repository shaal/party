import { BadgeCheckIcon } from '@heroicons/react/outline'
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
      <div>
        <div className="font-medium text-gray-800 dark:text-gray-200 mb-1">
          Preview
        </div>
        <div className="border rounded-lg w-28 h-28 flex justify-center items-center">
          {form.watch('icon') ? (
            <div>WIP</div>
          ) : (
            <BadgeCheckIcon className="h-5 w-5" />
          )}
          <div>{form.watch('name')}</div>
        </div>
      </div>
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
      <div>
        <div className="font-medium text-gray-800 dark:text-gray-200 mb-1">
          Select your badge color
        </div>
        <div className="space-x-2">
          <input
            className="p-3 text-purple-400 bg-purple-400"
            type="radio"
            id="A78BFA"
            value="A78BFA"
            name="color"
          />
          <input
            className="p-3 text-red-400 bg-red-400"
            type="radio"
            id="F87171"
            value="F87171"
            name="color"
          />
          <input
            className="p-3 text-green-400 bg-green-400"
            type="radio"
            id="34D399"
            value="34D399"
            name="color"
          />
          <input
            className="p-3 text-blue-400 bg-blue-400"
            type="radio"
            id="60A5FA"
            value="60A5FA"
            name="color"
          />
          <input
            className="p-3 text-indigo-400 bg-indigo-400"
            type="radio"
            id="818CF8"
            value="818CF8"
            name="color"
          />
          <input
            className="p-3 text-pink-400 bg-pink-400"
            type="radio"
            id="F472B6"
            value="F472B6"
            name="color"
          />
          <input
            className="p-3 text-yellow-400 bg-yellow-400"
            type="radio"
            id="FBBF24"
            value="FBBF24"
            name="color"
          />
          <input
            className="p-3 text-gray-400 bg-gray-400"
            type="radio"
            id="9CA3AF"
            value="9CA3AF"
            name="color"
          />
        </div>
      </div>
      <div className="ml-auto pt-3">
        <Button type="submit">Create badge</Button>
      </div>
    </Form>
  )
}

export default NewBadge
