const hre = require('hardhat')
const fs = require('fs')

async function main() {
  const NFTMarket = await hre.ethers.getContractFactory('NFTMarket')
  const nftMarket = await NFTMarket.deploy()
  await nftMarket.deployed()
  console.log('nftMarket deployed to:', nftMarket.address)

  const NFT = await hre.ethers.getContractFactory('NFT')
  const nft = await NFT.deploy(nftMarket.address)
  await nft.deployed()
  console.log('nft deployed to:', nft.address)

  fs.appendFileSync('.env', `NFT_MARKET_ADDRESS="${nftMarket.address}"\n`)
  fs.appendFileSync('.env', `NFT_ADDRESS="${nft.address}"\n`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
