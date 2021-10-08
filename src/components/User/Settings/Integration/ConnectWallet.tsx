import { gql, useMutation } from '@apollo/client'
import { Button } from '@components/ui/Button'
import getWeb3Modal from '@components/utils/getWeb3Modal'
import { ethers } from 'ethers'
import { useTheme } from 'next-themes'
import toast from 'react-hot-toast'
import { Integration } from 'src/__generated__/schema.generated'

import {
  WalletSettingsMutation,
  WalletSettingsMutationVariables
} from './__generated__/ConnectWallet.generated'

interface Props {
  integration: Integration
}

const ConnectWallet: React.FC<Props> = ({ integration }) => {
  const { resolvedTheme } = useTheme()
  const [editWallet] = useMutation<
    WalletSettingsMutation,
    WalletSettingsMutationVariables
  >(
    gql`
      mutation WalletSettingsMutation($input: EditIntegrationInput!) {
        editIntegration(input: $input) {
          id
          user {
            ethAddress
          }
        }
      }
    `,
    {
      onCompleted() {
        toast.success('Wallet has been connected successfully!')
      }
    }
  )

  const connectWallet = async () => {
    const web3Modal = getWeb3Modal({ theme: resolvedTheme })
    const web3 = new ethers.providers.Web3Provider(await web3Modal.connect())
    const address = await web3.getSigner().getAddress()

    editWallet({
      variables: {
        input: {
          ethAddress: address
        }
      }
    })

    web3Modal.clearCachedProvider()
  }

  const disconnectWallet = async () => {
    editWallet({
      variables: {
        input: { ethAddress: null }
      }
    })
  }

  return (
    <>
      {integration.user?.ethAddress ? (
        <Button
          className="w-full"
          variant="danger"
          type="button"
          onClick={disconnectWallet}
        >
          Disconnect Ethereum Wallet
        </Button>
      ) : (
        <Button
          className="w-full"
          variant="success"
          type="button"
          onClick={connectWallet}
        >
          Connect Ethereum Wallet
        </Button>
      )}
    </>
  )
}

export default ConnectWallet
