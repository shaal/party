require('@nomiclabs/hardhat-waffle')

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: { chainId: 1337 },
    rinkeby: {
      url: 'https://rinkeby.infura.io/v3/3d19324a72854976a7160e0e2ebc9c2b',
      accounts: [process.env.METAMASK_PRIVATE_KEY]
    },
    mumbai: {
      url: 'https://rpc-mumbai.maticvigil.com',
      accounts: [process.env.METAMASK_PRIVATE_KEY]
    }
  },
  solidity: {
    version: '0.8.9',
    settings: { optimizer: { enabled: true, runs: 200 } }
  }
}
