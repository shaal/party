require('@nomiclabs/hardhat-waffle')

const privateKey = process.env.METAMASK_PRIVATE_KEY || '01234567890123456789'

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: { chainId: 1337 },
    mumbai: {
      url: 'https://polygon-mumbai.g.alchemy.com/v2/4I2SjVe05n1iTtTO2bPGt4CnCCnLGkvm',
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
