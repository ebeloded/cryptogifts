import '@nomiclabs/hardhat-waffle'
import { task } from 'hardhat/config'
import fs from 'fs'
import path from 'path'

async function updateAdressesJSON(
  network: string,
  contract: string,
  address: string,
) {
  const filePath = path.resolve('./contracts/addresses.json')
  console.log({ network, contract, address, filePath })
  const data = JSON.parse(
    fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8') : '{}',
  )
  data[network] = data[network] || {}
  data[network][contract] = address
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

task('deploy', 'Deploys the contracts', async (taskArgs, hre) => {
  const { Cryptogift__factory } = await import('../contracts')
  const [signer] = await hre.ethers.getSigners()

  const Cryptogift = await new Cryptogift__factory(signer).deploy()

  await updateAdressesJSON(hre.network.name, 'Cryptogift', Cryptogift.address)
})
