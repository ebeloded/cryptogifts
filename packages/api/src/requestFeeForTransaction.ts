type RequestFeeForTransaction = {
  keyHash: string
}

export async function requestFeeForTransaction({
  keyHash,
}: RequestFeeForTransaction) {
  console.log({ keyHash })
}
