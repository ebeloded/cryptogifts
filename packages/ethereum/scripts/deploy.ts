// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from 'hardhat'
import fs from 'fs'
import path from 'path'

async function updateAdressesJSON(
  network: string,
  contract: string,
  address: string,
) {
  const filePath = path.resolve('./contracts-ts/addresses.json')
  console.log({ network, contract, address, filePath })
  const data = JSON.parse(
    fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8') : '{}',
  )
  data[network] = data[network] || {}
  data[network][contract] = address
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Greeter = await ethers.getContractFactory('Greeter')
  const greeter = await Greeter.deploy('Hello, Hardhat!')

  await greeter.deployed()

  console.log('Greeter deployed to:', greeter.address)

  const Payable = await ethers.getContractFactory('Payable')
  const payable = await Payable.deploy()

  await payable.deployed()

  console.log('Payable deployed to:', payable.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
