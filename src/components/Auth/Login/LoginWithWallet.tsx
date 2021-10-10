import { gql, useMutation } from '@apollo/client'
import { Button } from '@components/ui/Button'
import getWeb3Modal from '@components/utils/getWeb3Modal'
import { useAuthRedirect } from '@components/utils/useAuthRedirect'
import { ethers } from 'ethers'
import mixpanel from 'mixpanel-browser'
import { useTheme } from 'next-themes'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { PUBLIC_SIGNING_MESSAGE, STATIC_ASSETS } from 'src/constants'

import {
  LoginWithWalletMutation,
  LoginWithWalletMutationVariables
} from './__generated__/LoginWithWallet.generated'

const LoginWithWallet: React.FC = () => {
  const { resolvedTheme } = useTheme()
  const authRedirect = useAuthRedirect()
  const [loginButtonMessage, setLoginButtonMessage] =
    useState<string>('MetaMask')
  const [login] = useMutation<
    LoginWithWalletMutation,
    LoginWithWalletMutationVariables
  >(
    gql`
      mutation LoginWithWalletMutation($input: LoginWithWalletInput!) {
        loginWithWallet(input: $input) {
          id
        }
      }
    `,
    {
      onCompleted() {
        authRedirect()
      }
    }
  )

  const connectWallet = async () => {
    mixpanel.track('login.wallet.click')
    try {
      if (typeof window.web3 !== 'object') {
        return toast.error('Metamask not found in the browser!')
      }

      setLoginButtonMessage('Connecting...')
      const web3Modal = getWeb3Modal({ theme: resolvedTheme })
      const web3 = new ethers.providers.Web3Provider(await web3Modal.connect())
      const address = await web3.getSigner().getAddress()
      const response = await fetch(`/api/getnonce?address=${address}`)
      const data = await response.json()
      if (data.status === 'error') {
        toast.error(data.message)
        setLoginButtonMessage('MetaMask')
        mixpanel.track('login.wallet.success')
      } else {
        setLoginButtonMessage('Please sign...')
        const signature = await web3
          .getSigner()
          .provider.send('personal_sign', [
            `${PUBLIC_SIGNING_MESSAGE} ${data?.nonce}`,
            await web3.getSigner().getAddress()
          ])

        setLoginButtonMessage('Loggin in...')
        login({
          variables: { input: { nonce: data?.nonce as string, signature } }
        })
        mixpanel.track('login.wallet.success')
        web3Modal.clearCachedProvider()
      }
    } finally {
      setLoginButtonMessage('MetaMask')
    }
  }

  return (
    <Button
      size="lg"
      type="button"
      variant="success"
      className="w-full justify-center text-[#F6851B] border-[#F6851B] hover:bg-[#ffe9d5] focus:ring-[#F6851B]"
      onClick={connectWallet}
      disabled={loginButtonMessage !== 'MetaMask'}
      icon={
        <img
          src={`${STATIC_ASSETS}/brands/metamask.svg`}
          className="w-5"
          alt="MetaMask Logo"
        />
      }
      outline
    >
      {loginButtonMessage}
    </Button>
  )
}

export default LoginWithWallet
