import type { BigNumber, Cryptogifts } from '@cryptogifts/ethereum'
import type { RedeemableGift } from '$lib/types'

import { Network } from '$lib/types'
import { utils } from '@cryptogifts/ethereum'
import { nanoid } from 'nanoid'
import { getFeeData, getGift$ } from './ethereum'
import { Observable } from 'rxjs'

const GAS_PRICE_MULTIPLIER = 2

export async function getExtraFeeValue(contract: Cryptogifts) {
  const [requiredGas, feeData] = await Promise.all([
    contract.getRequiredGas(),
    getFeeData(),
  ])
  if (!feeData || !feeData.maxFeePerGas || !feeData.gasPrice)
    throw new Error('Fee data not found')

  const extraValueForFees = requiredGas
    .mul(feeData.maxFeePerGas || feeData.gasPrice)
    .mul(GAS_PRICE_MULTIPLIER)

  console.log('extraValueForFees', utils.formatEther(extraValueForFees))
  return extraValueForFees
}

export async function getBalanceNecessaryToRedeem(contract: Cryptogifts) {
  const [requiredGas, feeData] = await Promise.all([
    contract.getGasRequiredForRedeem(),
    getFeeData(),
  ])

  if (!feeData || !feeData.maxFeePerGas || !feeData.gasPrice)
    throw new Error('Fee data not found')

  const necessaryBalance = requiredGas.mul(
    feeData.maxFeePerGas || feeData.gasPrice,
  )
  console.log('necessaryBalance', utils.formatEther(necessaryBalance))
  return necessaryBalance.div(2)
}

// TODO: turn into an observable
export async function createGiftOfETH(
  contract: Cryptogifts,
  chainId: number,
  message: string,
  giftValueEth: string,
): Promise<RedeemableGift> {
  const key = nanoid()
  const hashHashKey = utils.keccak256(utils.keccak256(utils.toUtf8Bytes(key)))
  const giftValue = utils.parseEther(giftValueEth)
  const extraFeeValue = await getExtraFeeValue(contract)
  const value = giftValue.add(extraFeeValue)

  const contractTransaction = await contract.putETH(hashHashKey, giftValue, {
    value,
  })
  console.log({ contractTransaction })

  const contractReceipt = await contractTransaction.wait(1)

  console.log({ contractReceipt })

  return {
    n: Network.ethereum,
    c: chainId,
    k: key,
    m: message,
  }
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export function createGiftOfEthObservable(
  contract: Cryptogifts,
  chainId: number,
  giftValue: BigNumber,
) {
  let gift: any = {
    step: 0,
  }
  return new Observable((observer) => {
    let continueExectuion = true
    const key = nanoid()
    gift = { ...gift, key, chainId, step: 1 }
    observer.next(gift)

    getExtraFeeValue(contract).then((extraFeeValue) => {
      const value = giftValue.add(extraFeeValue)
      const hashHashKey = utils.keccak256(
        utils.keccak256(utils.toUtf8Bytes(key)),
      )
      gift = { ...gift, gift$: getGift$(hashHashKey), step: 2 }
      if (continueExectuion) {
        observer.next(gift)
        contract
          .putETH(hashHashKey, giftValue, {
            value,
          })
          .then(
            (contractTransaction) => {
              if (continueExectuion) {
                gift = { ...gift, contractTransaction, step: 3 }
                observer.next(gift)

                contractTransaction.wait(1).then((contractReceipt) => {
                  gift = { ...gift, contractReceipt, step: 4 }
                  observer.next(gift)
                  observer.complete()
                })
              }
            },
            (err) => {
              observer.error(err)
            },
          )
      }
    })
    return () => {
      continueExectuion = false
    }
  })
}

export async function redeemGift(contract: Cryptogifts, key: string) {
  console.log('redeem gift')

  const contractTransaction = await contract.redeemGift(key)
  console.log({ contractTransaction })

  const contractReceipt = await contractTransaction.wait(1)

  console.log({ contractReceipt })
}

export async function encodeGift(gift: RedeemableGift): Promise<string> {
  // TODO: add compressor
  return window.btoa(JSON.stringify(gift))
}

export async function decodeGiftCode(
  giftEncoded: string,
): Promise<RedeemableGift> {
  return JSON.parse(window.atob(giftEncoded))
}

export async function requestTransferFee(contract: Cryptogifts): Promise<void> {
  // needs to sign a message to verify current account address
}
