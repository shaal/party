describe('NFTMarket', function () {
  it('Should create market item and fetch', async function () {
    const Market = await ethers.getContractFactory('NFTMarket')
    const market = await Market.deploy()
    await market.deployed()
    const marketAddress = market.address
    const NFT = await ethers.getContractFactory('NFT')
    const nft = await NFT.deploy(marketAddress)
    await nft.deployed()
    const nftContractAddress = nft.address
    let listingPrice = await market.getListingPrice()
    listingPrice = listingPrice.toString()
    const auctionPrice = ethers.utils.parseUnits('1', 'ether')
    await nft.createToken('https://www.mytokenlocation.com')
    await nft.createToken('https://www.mytokenlocation2.com')
    const newNft = await market.createMarketItem(
      nftContractAddress,
      1,
      auctionPrice,
      { value: listingPrice }
    )
    console.log('Created NFT', newNft)

    item = await market.fetchItem(1)
    console.log('Found by tokenId --', item)
  })
})
