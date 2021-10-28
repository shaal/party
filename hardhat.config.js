require('@nomiclabs/hardhat-waffle')

const privateKey = process.env.METAMASK_PRIVATE_KEY || '01234567890123456789'

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: { chainId: 1337 },
    rinkeby: {
      url: 'https://rinkeby.infura.io/v3/3d19324a72854976a7160e0e2ebc9c2b',
      accounts: [privateKey]
    },
    mumbai: {
      url: 'https://rpc-mumbai.maticvigil.com',
      accounts: [privateKey]
    },
    matic: {
      url: 'https://rpc-mainnet.maticvigil.com',
      accounts: [privateKey]
    }
  },
  solidity: {
    version: '0.8.9',
    settings: { optimizer: { enabled: true, runs: 200 } }
  }
}
