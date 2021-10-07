import { gql, useMutation } from '@apollo/client'
import { Button } from '@components/ui/Button'
import WalletConnectProvider from '@walletconnect/web3-provider'
import toast from 'react-hot-toast'
import { Integration } from 'src/__generated__/schema.generated'
import Web3 from 'web3'
import Web3Modal from 'web3modal'

import {
  WalletSettingsMutation,
  WalletSettingsMutationVariables
} from './__generated__/ConnectWallet.generated'

interface Props {
  integration: Integration
}

const ConnectWallet: React.FC<Props> = ({ integration }) => {
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
    const web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions: {
        walletconnect: {
          display: { description: 'Use Rainbow & other popular wallets' },
          package: WalletConnectProvider,
          options: { infuraId: '3d19324a72854976a7160e0e2ebc9c2b' }
        }
      }
    })
    const connection = await web3Modal.connect()
    const web3 = new Web3(connection)

    editWallet({
      variables: {
        input: {
          ethAddress:
            web3.currentProvider?.constructor?.name === 'WalletConnectProvider'
              ? // @ts-ignore
                web3.currentProvider?.accounts[0]
              : // @ts-ignore
                web3.currentProvider.selectedAddress
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
