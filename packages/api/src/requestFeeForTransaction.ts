type RequestFeeForTransaction = {
  keyHash: string
  signedMessage: string
}

export async function requestFeeForTransaction({
  keyHash,
  signedMessage,
}: RequestFeeForTransaction) {
  // get gift, check if already redeemed
  console.log({ keyHash, signedMessage })
}
