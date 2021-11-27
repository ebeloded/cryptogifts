import { utils } from 'ethers'
import { firstValueFrom, filter } from 'rxjs'
import { connectEthereum, GiftStatus } from '@cryptogifts/ethereum'

export const requestTransferFee = async ({
  keyHash,
  signature,
  chainId,
}: RequestTransferFee) => {
  const addr = utils.verifyMessage(keyHash, signature)

  const privateKey =
    chainId === 31337
      ? process.env.HARDHAT_PRIVATE_KEY
      : process.env.PRIVATE_KEY

  console.log({ privateKey })

  const { contract$ } = connectEthereum(privateKey, chainId)

  const contract = await firstValueFrom(contract$.pipe(filter((v) => !!v)))

  const hashHashKey = utils.keccak256(keyHash)

  const gift = await contract.get(hashHashKey)

  console.log({ gift })

  if (gift.status !== GiftStatus.PENDING) {
    throw new Error(
      `Gift is not in pending state. Current State: ${GiftStatus}`,
    )
  }
  if (!gift.giftGas.gt(0)) {
    throw new Error(`Gift transfer fee already redeemed`)
  }

  console.log(`providing ${utils.formatEther(gift.giftGas)} to ${addr}`)
  try {
    const contractTransaction = await contract.provideTransferFee(addr, keyHash)

    console.log({ contractTransaction })

    return contractTransaction
  } catch (err) {
    console.error(err)
    throw new Error(`Error providing transfer fee`)
  }
}

type RequestTransferFee = {
  keyHash: string
  signature: string
  chainId: number
}
