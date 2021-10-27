import '@nomiclabs/hardhat-waffle'

export const defaultNetwork = 'hardhat'
export const networks = {
  hardhat: { chainId: 1337 },
  mumbai: {
    url: 'https://rpc-mumbai.maticvigil.com',
    accounts: [process.env.METAMASK_PRIVATE_KEY]
  }
}
export const solidity = {
  version: '0.8.9',
  settings: { optimizer: { enabled: true, runs: 200 } }
}
