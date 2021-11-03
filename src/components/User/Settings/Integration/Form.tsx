import { gql, useMutation } from '@apollo/client'
import { GridItemEight, GridItemFour, GridLayout } from '@components/GridLayout'
import { Button } from '@components/UI/Button'
import { Card, CardBody } from '@components/UI/Card'
import { Form, useZodForm } from '@components/UI/Form'
import { Input } from '@components/UI/Input'
import { Spinner } from '@components/UI/Spinner'
import { CheckCircleIcon } from '@heroicons/react/outline'
import dynamic from 'next/dynamic'
import React from 'react'
import toast from 'react-hot-toast'
import { Integration } from 'src/__generated__/schema.generated'
import { BASE_URL } from 'src/constants'
import { object, string } from 'zod'

import Sidebar from '../Sidebar'
import {
  IntegrationSettingsMutation,
  IntegrationSettingsMutationVariables
} from './__generated__/Form.generated'

const ConnectWallet = dynamic(() => import('./ConnectWallet'), {
  loading: () => <div className="shimmer w-full h-9 rounded-lg" />
})

const editIntegrationSchema = object({
  wakatimeAPIKey: string()
    .max(100, { message: '🔑 API key should not exceed 100 characters' })
    .nullable()
})

interface Props {
  integration: Integration
}

const SUCCESS_MESSAGE = 'Integration settings successfully updated!'

const IntegrationSettingsForm: React.FC<Props> = ({ integration }) => {
  const [editIntegration] = useMutation<
    IntegrationSettingsMutation,
    IntegrationSettingsMutationVariables
  >(
    gql`
      mutation IntegrationSettingsMutation($input: EditIntegrationInput!) {
        editIntegration(input: $input) {
          id
          wakatimeAPIKey
          spotifyRefreshToken
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
    schema: editIntegrationSchema,
    defaultValues: {
      wakatimeAPIKey: integration?.wakatimeAPIKey as string
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
                    input: { wakatimeAPIKey }
                  }
                })
              }
            >
              <ConnectWallet integration={integration} />
              {integration?.spotifyRefreshToken ? (
                <Button
                  variant="danger"
                  type="button"
                  onClick={() =>
                    editIntegration({
                      variables: { input: { spotifyRefreshToken: null } }
                    })
                  }
                >
                  Disconnect Spotify
                </Button>
              ) : (
                <a
                  href={`https://accounts.spotify.com/authorize?client_id=${process.env.SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${BASE_URL}/api/callback/spotify&scope=user-read-currently-playing`}
                >
                  <Button className="w-full" variant="success" type="button">
                    Connect Spotify
                  </Button>
                </a>
              )}
              <div className="border-b" />
              <Input
                label="Wakatime API Key"
                type="text"
                placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx"
                {...form.register('wakatimeAPIKey')}
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

export default IntegrationSettingsForm
