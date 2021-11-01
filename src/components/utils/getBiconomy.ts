// @ts-ignore
import { Biconomy } from '@biconomy/mexa'
import { ethers } from 'ethers'

export const getBiconomy = async (web3Modal: any) => {
  const web3 = new ethers.providers.Web3Provider(await web3Modal.connect())
  const biconomy = new Biconomy(
    new ethers.providers.JsonRpcProvider(
      'https://speedy-nodes-nyc.moralis.io/ff1274045f2cabf446cb8753/polygon/mumbai'
    ),
    {
      apiKey: process.env.BICONOMY_API_KEY,
      walletProvider: web3.provider
    }
  )

  await new Promise((resolve, reject) =>
    biconomy.onEvent(biconomy.READY, resolve).onEvent(biconomy.ERROR, reject)
  )

  return { biconomy, web3 }
}
