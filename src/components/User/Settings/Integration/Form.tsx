import { gql, useMutation } from '@apollo/client'
import React from 'react'
import toast from 'react-hot-toast'
import { object, string } from 'zod'

import { Integration } from '~/__generated__/schema.generated'
import {
  GridItemEight,
  GridItemFour,
  GridLayout
} from '~/components/GridLayout'
import { Button } from '~/components/ui/Button'
import { Card, CardBody } from '~/components/ui/Card'
import { ErrorMessage } from '~/components/ui/ErrorMessage'
import { Form, useZodForm } from '~/components/ui/Form'
import { Input } from '~/components/ui/Input'
import { SuccessMessage } from '~/components/ui/SuccessMessage'

import Sidebar from '../Sidebar'
import {
  IntegrationSettingsMutation,
  IntegrationSettingsMutationVariables
} from './__generated__/Form.generated'

const editProfileSchema = object({
  wakatimeAPIKey: string().max(100).nullable()
})

interface Props {
  integration: Integration
}

const SUCCESS_MESSAGE = 'Integration settings successfully updated!'

const IntegrationSettingsForm: React.FC<Props> = ({ integration }) => {
  const [editIntegration, editIntegrationResult] = useMutation<
    IntegrationSettingsMutation,
    IntegrationSettingsMutationVariables
  >(
    gql`
      mutation IntegrationSettingsMutation($input: EditIntegrationInput!) {
        editIntegration(input: $input) {
          id
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
    schema: editProfileSchema,
    defaultValues: {
      wakatimeAPIKey: integration.wakatimeAPIKey as string
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
              onSubmit={({ wakatimeAPIKey }) =>
                editIntegration({
                  variables: {
                    input: { wakatimeAPIKey: wakatimeAPIKey as string }
                  }
                })
              }
            >
              <ErrorMessage
                title="Error updating integration settings"
                error={editIntegrationResult.error}
              />
              {editIntegrationResult.data && (
                <SuccessMessage>{SUCCESS_MESSAGE}</SuccessMessage>
              )}
              <Input
                label="Wakatime API Key"
                type="text"
                placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx"
                {...form.register('wakatimeAPIKey')}
              />
              <div className="ml-auto pt-3">
                <Button type="submit">Save</Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </GridItemEight>
    </GridLayout>
  )
}

export default IntegrationSettingsForm
