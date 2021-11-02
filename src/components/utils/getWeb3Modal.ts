import Web3Modal from 'web3modal'

const getWeb3Modal = () => {
  const web3Modal = new Web3Modal({
    network: 'mainnet',
    cacheProvider: false
  })

  return web3Modal
}

export default getWeb3Modal
