const { expect } = require('@playwright/test')

describe('Devparty NFT Contract', function () {
  it('should issue token (issueToken)', async function () {
    const NFT = await ethers.getContractFactory('Devparty')
    const nft = await NFT.deploy()
    await nft.deployed()
    const signerAddress = '3A5bd1E37b099aE3386D13947b6a90d97675e5e3'
    const token = await nft.issueToken(
      `0x${signerAddress}`,
      69,
      'https://bafybeiewuo3rq2glwgg7f2n743svfvgw5zaiyoxuwqqc54ogy5hobmln4i.ipfs.infura-ipfs.io/'
    )

    expect(token.data.includes(signerAddress.toLowerCase())).toBe(true)
  })
})
