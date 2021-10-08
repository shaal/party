import { gql, useMutation } from '@apollo/client'
import { Button } from '@components/ui/Button'
import getWeb3Modal from '@components/utils/getWeb3Modal'
import { useAuthRedirect } from '@components/utils/useAuthRedirect'
import { ethers } from 'ethers'
import { useTheme } from 'next-themes'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

import {
  LoginWithWalletMutation,
  LoginWithWalletMutationVariables
} from './__generated__/LoginWithWallet.generated'

const LoginWithWallet: React.FC = () => {
  const { resolvedTheme } = useTheme()
  const authRedirect = useAuthRedirect()
  const [loading, setLoading] = useState<boolean>(false)
  const [login, loginResult] = useMutation<
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
    try {
      setLoading(true)
      const web3Modal = getWeb3Modal({ theme: resolvedTheme })
      const web3 = new ethers.providers.Web3Provider(await web3Modal.connect())
      const address = await web3.getSigner().getAddress()
      const response = await fetch(`/api/nonce?address=${address}`)
      const data = await response.json()
      if (data.status === 'error') {
        toast.error(data.message)
        setLoading(false)
      } else {
        const signature = await web3
          .getSigner()
          .provider.send('personal_sign', [
            `Sign into Devparty with this wallet. ${data?.nonce}`,
            await web3.getSigner().getAddress()
          ])

        login({
          variables: { input: { nonce: data?.nonce as string, signature } }
        })
        web3Modal.clearCachedProvider()
      }
    } catch {
      setLoading(false)
    }
  }

  return (
    <Button
      size="lg"
      type="button"
      variant="success"
      className=" w-full justify-center"
      onClick={connectWallet}
      disabled={loading}
      outline
    >
      {loading ? 'Connecting...' : 'Login with Wallet'}
    </Button>
  )
}

export default LoginWithWallet
