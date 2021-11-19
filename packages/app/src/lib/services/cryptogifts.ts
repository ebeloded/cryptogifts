import type { CryptoGifts } from '@cryptogifts/ethereum'
import type { RedeemableGift } from '$lib/types'

import { Chain } from '$lib/types'
import { utils } from '@cryptogifts/ethereum'
import { nanoid } from 'nanoid'

export async function createGiftOfETH(
  contract: CryptoGifts,
  network: number,
  message: string,
  giftValueEth: string,
): Promise<RedeemableGift> {
  const key = nanoid()
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
    n: network,
    k: key,
    m: message,
  }
}

export async function redeemGiftOfETH(gift: RedeemableGift) {
  // create key hash
  // send it to functions
}

export function encodeGift(gift: RedeemableGift): string {
  return window.btoa(JSON.stringify(gift))
}

export async function decodeGift(giftEncoded: string): Promise<RedeemableGift> {
  try {
    const gift = JSON.parse(window.atob(giftEncoded))
    return gift
  } catch (error) {
    throw new Error('Invalid gift')
  }
}

export function requestTransactionsFee() {
  // needs to sign a message to verify current account address
}
