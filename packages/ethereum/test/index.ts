import { expect } from 'chai'
import { ethers } from 'hardhat'
import { Greeter, Greeter__factory } from '../typechain-types'

describe('Greeter', function () {
  before(() => {})
  it("Should return the new greeting once it's changed", async function () {
    const GreeterContract = (await ethers.getContractFactory(
      'Greeter',
    )) as Greeter__factory

    const greeter = (await GreeterContract.deploy('Hello, world!')) as Greeter

    await greeter.deployed()

    expect(await greeter.greet()).to.equal('Hello, world!')

    const setGreetingTx = await greeter.setGreeting('Hola, mundo!')

    // wait until the transaction is mined
    await setGreetingTx.wait()

    expect(await greeter.greet()).to.equal('Hola, mundo!')
  })
})
