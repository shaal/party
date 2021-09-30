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
import { Integration } from 'src/__generated__/schema.generated'
import Web3 from 'web3'
import Web3Modal from 'web3modal'
import { object, string } from 'zod'

import Sidebar from '../Sidebar'
import {
  IntegrationSettingsMutation,
  IntegrationSettingsMutationVariables
} from './__generated__/Form.generated'

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
  const [editIntegration, editIntegrationResult] = useMutation<
    IntegrationSettingsMutation,
    IntegrationSettingsMutationVariables
  >(
    gql`
      mutation IntegrationSettingsMutation($input: EditIntegrationInput!) {
        editIntegration(input: $input) {
          id
          wakatimeAPIKey
          spotifyRefreshToken
          ethAddress
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

  const connectWallet = async (type: string) => {
    const web3Modal = new Web3Modal()
    let web3
    if (type === 'connect') {
      const connection = await web3Modal.connect()
      web3 = new Web3(connection)
    } else {
      await web3Modal.clearCachedProvider()
    }

    editIntegration({
      variables: {
        input: {
          ethAddress:
            // @ts-ignore
            type === 'connect' ? web3?.currentProvider?.selectedAddress : null
        }
      }
    })
  }

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
              <ErrorMessage
                title="Error updating integration settings"
                error={editIntegrationResult.error}
              />
              {editIntegrationResult.data && (
                <SuccessMessage>{SUCCESS_MESSAGE}</SuccessMessage>
              )}
              {integration.spotifyRefreshToken ? (
                <Button
                  variant="success"
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
                  href={`https://accounts.spotify.com/authorize?client_id=${process.env.SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.BASE_URL}/api/callback/spotify&scope=user-read-currently-playing`}
                >
                  <Button className="w-full" variant="success" type="button">
                    Connect Spotify
                  </Button>
                </a>
              )}
              {integration.ethAddress ? (
                <Button
                  type="button"
                  onClick={() => connectWallet('disconnect')}
                >
                  Disconnect Ethereum Wallet
                </Button>
              ) : (
                <Button type="button" onClick={() => connectWallet('connect')}>
                  Connect Ethereum Wallet
                </Button>
              )}
              <div className="border-b"></div>
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
