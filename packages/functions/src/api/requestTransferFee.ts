import { utils } from 'ethers'
import { firstValueFrom, filter } from 'rxjs'
import { connectEthereum } from '@cryptogifts/ethereum'

const filterUndefined = (v: any) => !!v

export const requestTransferFee = async ({
  keyHash,
  signature,
  chainId,
}: RequestTransferFee) => {
  const { user$, contract$ } = connectEthereum(process.env.PRIVATE_KEY, chainId)
  const user = await firstValueFrom(user$.pipe(filter((v) => !!v)))
  const contract = await firstValueFrom(contract$.pipe(filter((v) => !!v)))
  // get gift, check if already redeemed
  const addr = utils.verifyMessage(keyHash, signature)
  console.log(`providing eth to ${addr}`)
  await contract.provideTransferETH(addr, keyHash)
  // call provideTransferETH on the contract

  return { addr }
}

type RequestTransferFee = {
  keyHash: string
  signature: string
  chainId: number
}
