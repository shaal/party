import Web3Modal from 'web3modal'

interface Props {
  theme: any
}

const getWeb3Modal = ({ theme }: Props) => {
  const web3Modal = new Web3Modal({
    network: 'mainnet',
    cacheProvider: false,
    theme
  })
  web3Modal.clearCachedProvider()

  return web3Modal
}

export default getWeb3Modal
