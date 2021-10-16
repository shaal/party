import WalletConnectProvider from '@walletconnect/web3-provider'
import Web3Modal from 'web3modal'

interface Props {
  theme: any
}

const getWeb3Modal = ({ theme }: Props) => {
  const web3Modal = new Web3Modal({
    network: 'mainnet',
    cacheProvider: false,
    providerOptions: {
      walletconnect: {
        display: { description: 'Use Rainbow & other popular wallets' },
        package: WalletConnectProvider,
        options: { infuraId: '3d19324a72854976a7160e0e2ebc9c2b' }
      }
    },
    theme
  })
  web3Modal.clearCachedProvider()

  return web3Modal
}

export default getWeb3Modal
