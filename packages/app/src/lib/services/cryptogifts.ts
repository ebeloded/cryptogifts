import { RedeemableGift, Chain } from '$lib/types'
import { CryptoGifts, EthereumNetwork, utils } from '@cryptogifts/ethereum'
import { nanoid } from 'nanoid'
import { getFeeData } from './ethereum'

export async function createGiftOfETH(
  contract: CryptoGifts,
  network: number,
  message: string,
  giftValueEth: string,
): Promise<RedeemableGift> {
  const key = nanoid()

  // const { gasPrice, maxFeePerGas, maxPriorityFeePerGas } = await getFeeData()

  const requiredGas = await contract.getRequiredGas()
  const hashHashKey = utils.keccak256(utils.keccak256(utils.toUtf8Bytes(key)))
  const giftValue = utils.parseEther(giftValueEth)
  const value = giftValue.add(requiredGas)

  const putEthTransaction = await contract.putETH(hashHashKey, giftValue, {
    value,
  })

  await putEthTransaction.wait(1)

  return {
    c: Chain.ethereum,
    n: EthereumNetwork.mainnet,
    k: key,
    m: message,
  }
}

export function encodeGift(gift: RedeemableGift): string {
  return JSON.stringify(gift)
}

export function decodeGift(giftEncoded: string): RedeemableGift {
  return JSON.parse(giftEncoded)
}

export function requestTransactionsFee() {
  // needs to sign a message to verify current account address
}
