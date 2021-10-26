require('@nomiclabs/hardhat-waffle')

module.exports = {
  defaultNetwork: 'hardhat',
  networks: { hardhat: { chainId: 1337 } },
  solidity: {
    version: '0.8.9',
    settings: { optimizer: { enabled: true, runs: 200 } }
  }
}
