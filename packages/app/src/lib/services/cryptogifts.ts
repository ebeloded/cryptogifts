import type { CryptoGifts } from '@cryptogifts/ethereum'
import type { RedeemableGift } from '$lib/types'

import { Network } from '$lib/types'
import { utils } from '@cryptogifts/ethereum'
import { nanoid } from 'nanoid'

export async function createGiftOfETH(
  contract: CryptoGifts,
  chainId: number,
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
    n: Network.ethereum,
    c: chainId,
    k: key,
    m: message,
  }
}

export async function redeemGiftOfETH(gift: RedeemableGift) {
  // create key hash
  console.log({ gift })
  // send it to functions
}

export async function encodeGift(gift: RedeemableGift): Promise<string> {
  return window.btoa(JSON.stringify(gift))
}

export async function decodeGiftCode(
  giftEncoded: string,
): Promise<RedeemableGift> {
  return JSON.parse(window.atob(giftEncoded))
}

export async function requestTransferFee(contract: CryptoGifts): Promise<void> {
  // needs to sign a message to verify current account address
}
