describe('NFTMarket', function () {
  it('Should create market items and fetch', async function () {
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

    let nftOne = await market.createMarketItem(
      nftContractAddress,
      1,
      auctionPrice,
      {
        value: listingPrice
      }
    )
    console.log('Create nftOne NFT', nftOne)

    await market.createMarketItem(nftContractAddress, 2, auctionPrice, {
      value: listingPrice
    })

    items = await market.fetchMarketItems()
    console.log('Total items in market -- ', items.length)
    const tokenUri = await nft.tokenURI(1)
    console.log('tokenUri -- ', tokenUri)
    item = await market.findMarketItemByTokenId(items[0].tokenId)
    console.log('Found by tokenId --', item)
  })
})
