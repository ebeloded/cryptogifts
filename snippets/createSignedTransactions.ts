export const get = async (key: string) => {
  const data = Cryptogift__factory.createInterface().encodeFunctionData('get', [
    key,
  ])
  console.log({ data })
  const nonce = await provider().getTransactionCount(signer().address)
  console.log({ nonce })
  const transaction = await signer().signTransaction({
    data,
    to: ADDRESS,
    nonce,
    gasPrice: 209628361,
    gasLimit: 121592,
  })
  console.log({ transaction })

  const response = await provider().sendTransaction(transaction)
  console.log({ response })
}
