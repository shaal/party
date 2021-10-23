import { gql, useMutation } from '@apollo/client'
import { Button } from '@components/UI/Button'
import { Card, CardBody } from '@components/UI/Card'
import { Form, useZodForm } from '@components/UI/Form'
import AppContext from '@components/utils/AppContext'
import { ArrowCircleRightIcon } from '@heroicons/react/outline'
import mixpanel from 'mixpanel-browser'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import toast from 'react-hot-toast'
import { boolean, object } from 'zod'

import {
  AcceptCocAndTosMutation,
  AcceptCocAndTosMutationVariables
} from './__generated__/index.generated'

const acceptCOCAndTosSchema = object({
  coc: boolean(),
  tos: boolean()
})

const Onboarding: React.FC = () => {
  const { currentUser } = useContext(AppContext)
  const router = useRouter()
  const [acceptCocAndTos] = useMutation<
    AcceptCocAndTosMutation,
    AcceptCocAndTosMutationVariables
  >(
    gql`
      mutation AcceptCOCAndTOSMutation($input: AcceptCOCAndTOSInput!) {
        acceptCocAndTos(input: $input) {
          id
        }
      }
    `,
    {
      onError(error) {
        toast.error(error.message)
        mixpanel.track('user.onboarding.accept_coc_and_tos.failed')
      },
      onCompleted() {
        router.push('/onboarding/topics')
        mixpanel.track('user.onboarding.accept_coc_and_tos.success')
      }
    }
  )

  const form = useZodForm({
    schema: acceptCOCAndTosSchema
  })

  return (
    <div
      className="flex justify-center items-center h-[90vh]"
      style={{
        backgroundImage:
          'url(https://ik.imagekit.io/devparty/tr:w-,h-/https://assets.devparty.io/images/patterns/1.svg)'
      }}
    >
      <Card className="w-full sm:max-w-xl border-2 shadow-lg">
        <div className="bg-black rounded-t-none sm:rounded-t-lg py-8 px-5 text-white space-y-5">
          <img className="h-10 w-10" src="/white.svg" alt="Logo" />
          <div className="text-3xl font-bold space-y-1.5">
            <div>@{currentUser?.username} — welcome to</div>
            <div>Devparty!</div>
          </div>
          <div>A social network for developers and creators.</div>
        </div>
        <CardBody className="linkify space-y-2">
          <Form
            form={form}
            onSubmit={({ coc, tos }) => {
              mixpanel.track('user.onboarding.accept_coc_and_tos.click')
              acceptCocAndTos({ variables: { input: { coc, tos } } })
            }}
          >
            <div className="flex items-center space-x-2">
              <input id="acceptCOC" type="checkbox" {...form.register('coc')} />
              <label htmlFor="acceptCOC">
                You agree to uphold our <a href="/">Code of Conduct</a>
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input id="acceptCOC" type="checkbox" {...form.register('tos')} />
              <label htmlFor="acceptCOC">
                You agree to our <a href="/">Terms and Conditions</a>
              </label>
            </div>
            <div className="pt-5">
              <Button
                className="mx-auto"
                icon={<ArrowCircleRightIcon className="h-4 w-4" />}
                disabled={!form.watch('coc') && !form.watch('tos')}
              >
                Continue
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  )
}

export default Onboarding
