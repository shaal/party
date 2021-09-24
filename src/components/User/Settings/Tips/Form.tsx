import { gql, useMutation } from '@apollo/client'
import { GridItemEight, GridItemFour, GridLayout } from '@components/GridLayout'
import { Button } from '@components/ui/Button'
import { Card, CardBody } from '@components/ui/Card'
import { ErrorMessage } from '@components/ui/ErrorMessage'
import { Form, useZodForm } from '@components/ui/Form'
import { Input } from '@components/ui/Input'
import { Spinner } from '@components/ui/Spinner'
import { SuccessMessage } from '@components/ui/SuccessMessage'
import { CheckCircleIcon } from '@heroicons/react/outline'
import React from 'react'
import toast from 'react-hot-toast'
import { User } from 'src/__generated__/schema.generated'
import { object, string } from 'zod'

import Sidebar from '../Sidebar'
import {
  TipsSettingsMutation,
  TipsSettingsMutationVariables
} from './__generated__/Form.generated'

const editTipsSchema = object({
  cash: string()
    .max(30, { message: 'Cashtag should be within 30 characters' })
    .nullable(),
  paypal: string()
    .max(30, { message: 'Paypal.me username should be within 30 characters' })
    .nullable(),
  github: string()
    .max(30, { message: 'GitHub username should be within 30 characters' })
    .nullable(),
  buymeacoffee: string()
    .max(30, {
      message: 'Buymeacoffee username should be within 30 characters'
    })
    .nullable(),
  bitcoin: string()
    .max(42, { message: 'Bitcoin address should be within 42 characters' })
    .nullable(),
  ethereum: string()
    .max(42, { message: 'Bitcoin address should be within 42 characters' })
    .nullable()
})

interface Props {
  currentUser: User
}

const SUCCESS_MESSAGE = 'Tips successfully updated!'

const TipsSettingsForm: React.FC<Props> = ({ currentUser }) => {
  const [editTips, editTipsResult] = useMutation<
    TipsSettingsMutation,
    TipsSettingsMutationVariables
  >(
    gql`
      mutation TipsSettingsMutation($input: EditTipsInput!) {
        editTips(input: $input) {
          id
          cash
          paypal
          github
          buymeacoffee
          bitcoin
          ethereum
        }
      }
    `,
    {
      onCompleted() {
        toast.success(SUCCESS_MESSAGE)
      }
    }
  )

  const form = useZodForm({
    schema: editTipsSchema,
    defaultValues: {
      cash: currentUser.tip?.cash as string,
      paypal: currentUser.tip?.paypal as string,
      github: currentUser.tip?.github as string,
      buymeacoffee: currentUser.tip?.buymeacoffee as string,
      bitcoin: currentUser.tip?.bitcoin as string,
      ethereum: currentUser.tip?.ethereum as string
    }
  })

  return (
    <GridLayout>
      <GridItemFour>
        <Sidebar />
      </GridItemFour>
      <GridItemEight>
        <Card>
          <CardBody>
            <Form
              form={form}
              className="space-y-4"
              onSubmit={({
                cash,
                paypal,
                github,
                buymeacoffee,
                bitcoin,
                ethereum
              }) =>
                editTips({
                  variables: {
                    input: {
                      cash,
                      paypal,
                      github,
                      buymeacoffee,
                      bitcoin,
                      ethereum
                    }
                  }
                })
              }
            >
              <ErrorMessage
                title="Error updating tips"
                error={editTipsResult.error}
              />
              {editTipsResult.data && (
                <SuccessMessage>{SUCCESS_MESSAGE}</SuccessMessage>
              )}
              <Input
                label="Cashtag"
                type="text"
                placeholder="$johndoe"
                {...form.register('cash')}
              />
              <Input
                label="Paypal.me"
                type="text"
                placeholder="johndoe"
                {...form.register('paypal')}
              />
              <Input
                label="GitHub"
                type="text"
                placeholder="johndoe"
                {...form.register('github')}
              />
              <Input
                label="Buy Me a Coffee"
                type="text"
                placeholder="johndoe"
                {...form.register('buymeacoffee')}
              />
              <Input
                label="Bitcoin"
                type="text"
                placeholder="38gqtXyXUxB1mHR7mJf1bHzLSf6vHVBi6Q"
                {...form.register('bitcoin')}
              />
              <Input
                label="Ethereum"
                type="text"
                placeholder="0x635f595A4a0216106FA888773c0A6daCB4b3Ffc5"
                {...form.register('ethereum')}
              />
              <div className="ml-auto pt-3">
                <Button
                  type="submit"
                  icon={
                    form.formState.isSubmitting ? (
                      <Spinner size="xs" />
                    ) : (
                      <CheckCircleIcon className="h-4 w-4" />
                    )
                  }
                >
                  Save
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </GridItemEight>
    </GridLayout>
  )
}

export default TipsSettingsForm
