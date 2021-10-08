import { gql, useMutation } from '@apollo/client'
import { Button } from '@components/ui/Button'
import { ErrorMessage } from '@components/ui/ErrorMessage'
import { Form, useZodForm } from '@components/ui/Form'
import { Input } from '@components/ui/Input'
import { Spinner } from '@components/ui/Spinner'
import getWeb3Modal from '@components/utils/getWeb3Modal'
import { useAuthRedirect } from '@components/utils/useAuthRedirect'
import { LogoutIcon } from '@heroicons/react/outline'
import { ethers } from 'ethers'
import { useTheme } from 'next-themes'
import React, { useState } from 'react'
import { object, string } from 'zod'

import Waitlist from '../Waitlist'
import {
  LoginFormMutation,
  LoginFormMutationVariables
} from './__generated__/Form.generated'

const loginSchema = object({
  email: string().email({ message: '📧 Invalid email' }),
  password: string().min(6, {
    message: '👀 Password should atleast have 6 characters'
  })
})

const LoginForm: React.FC = () => {
  const { resolvedTheme } = useTheme()
  const [showModal, setShowModal] = useState<boolean>(false)
  const authRedirect = useAuthRedirect()
  const [login, loginResult] = useMutation<
    LoginFormMutation,
    LoginFormMutationVariables
  >(
    gql`
      mutation LoginFormMutation($input: LoginInput!) {
        login(input: $input) {
          id
          inWaitlist
        }
      }
    `,
    {
      onCompleted(data) {
        if (data?.login?.inWaitlist) {
          setShowModal(true)
        } else {
          authRedirect()
        }
      }
    }
  )

  const form = useZodForm({
    schema: loginSchema
  })

  const connectWallet = async () => {
    const web3Modal = getWeb3Modal({ theme: resolvedTheme })
    const web3 = new ethers.providers.Web3Provider(await web3Modal.connect())
    const address = await web3.getSigner().getAddress()
    const signature = await web3
      .getSigner()
      .provider.send('personal_sign', [
        `Sign into Devparty with this wallet.`,
        await web3.getSigner().getAddress()
      ])

    web3Modal.clearCachedProvider()
  }

  return (
    <Form
      form={form}
      onSubmit={({ email, password }) =>
        login({ variables: { input: { email, password } } })
      }
    >
      <ErrorMessage
        title="Login failed."
        error={loginResult.error}
        className="mb-3"
      />
      {showModal && (
        <Waitlist showModal={showModal} setShowModal={setShowModal} />
      )}
      <div className="space-y-4">
        <div>
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="me@example.com"
            autoFocus
            {...form.register('email')}
          />
        </div>
        <div>
          <Input
            label="Password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••••"
            {...form.register('password')}
          />
        </div>
        <Button
          size="lg"
          type="submit"
          className=" w-full justify-center"
          icon={
            form.formState.isSubmitting ? (
              <Spinner size="xs" className="mr-1" />
            ) : (
              <LogoutIcon className="h-5 w-5" />
            )
          }
        >
          Login
        </Button>
        <Button
          size="lg"
          type="button"
          variant="success"
          className=" w-full justify-center"
          onClick={connectWallet}
          outline
        >
          Login with Wallet
        </Button>
      </div>
    </Form>
  )
}

export default LoginForm
