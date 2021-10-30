require('@nomiclabs/hardhat-waffle')

const privateKey = process.env.METAMASK_PRIVATE_KEY || '01234567890123456789'

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: { chainId: 1337 },
    rinkeby: {
      url: 'https://speedy-nodes-nyc.moralis.io/ff1274045f2cabf446cb8753/eth/rinkeby',
      accounts: [privateKey]
    },
    mumbai: {
      url: 'https://speedy-nodes-nyc.moralis.io/ff1274045f2cabf446cb8753/polygon/mumbai',
      accounts: [privateKey]
    },
    matic: {
      url: 'https://speedy-nodes-nyc.moralis.io/ff1274045f2cabf446cb8753/polygon/mainnet',
      accounts: [privateKey]
    }
  },
  solidity: {
    version: '0.8.9',
    settings: { optimizer: { enabled: true, runs: 200 } }
  }
}
