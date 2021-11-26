import { utils } from 'ethers'

export async function requestTransferFee(keyHash: string, signature: string) {
  // get gift, check if already redeemed
  const addr = utils.verifyMessage(keyHash, signature)
  console.log({ addr })
}
