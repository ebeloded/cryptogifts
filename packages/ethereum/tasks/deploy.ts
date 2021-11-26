import '@nomiclabs/hardhat-waffle'
import { task } from 'hardhat/config'
import fs from 'fs'
import path from 'path'

async function updateAdressesJSON(
  network: string,
  contract: string,
  address: string,
) {
  const filePath = path.resolve(`./addresses/${network}.json`)
  console.log({ network, contract, address, filePath })
  const data = JSON.parse(
    fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8') : '{}',
  )
  data[contract] = address
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

task('deploy', 'Deploys the contracts', async (_taskArgs, hre) => {
  const CryptogiftsFactory = await hre.ethers.getContractFactory('Cryptogifts')

  const Cryptogifts = await CryptogiftsFactory.deploy()

  await updateAdressesJSON(hre.network.name, 'Cryptogifts', Cryptogifts.address)
})
