import { expect } from 'chai'
import { ethers } from 'hardhat'
import { utils, BigNumber } from 'ethers'
const { parseEther, formatEther } = utils

import {
  Greeter,
  Greeter__factory,
  CryptoGifts,
  CryptoGifts__factory,
} from '../contracts'

// xdescribe('Greeter', function () {
//   it("Should return the new greeting once it's changed", async function () {
//     const GreeterContract = (await ethers.getContractFactory(
//       'Greeter',
//     )) as Greeter__factory

//     const greeter = (await GreeterContract.deploy('Hello, world!')) as Greeter

//     await greeter.deployed()

//     expect(await greeter.greet()).to.equal('Hello, world!')

//     const setGreetingTx = await greeter.setGreeting('Hola, mundo!')

//     // wait until the transaction is mined
//     await setGreetingTx.wait()

//     expect(await greeter.greet()).to.equal('Hola, mundo!')
//   })
// })
