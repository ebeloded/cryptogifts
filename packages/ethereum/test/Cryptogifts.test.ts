import { expect } from 'chai'
import { ethers } from 'hardhat'
import { BigNumber } from 'ethers'

import { CryptoGifts } from '../contracts'

describe('Cryptogifts', () => {
  let contract: CryptoGifts
  let owner, addr1, addr2, addrs
  before(async () => {
    ;[owner, addr1, addr2, ...addrs] = await ethers.getSigners()
    const contractFactory = await ethers.getContractFactory('CryptoGifts')
    // const contractFactory = new CryptoGifts__factory()

    contract = (await contractFactory.deploy()) as CryptoGifts
  })

  describe('getRequiredGas', async () => {
    const MINIMUM_GAS = BigNumber.from(1) // wei

    it('getRequiredGas retuns value greater than zero', async () => {
      const requiredGas = await contract.getRequiredGas()
      expect(requiredGas).to.be.gt(MINIMUM_GAS)
    })
  })

  describe('putETH', async () => {
    it('putETH fails without value', async () => {
      await expect(contract.putETH('random-key', 1)).to.be.revertedWith(
        'ValueMustBeGreaterThanZero()',
      )
    })

    it('putETH fails without amount', async () => {
      await expect(
        contract.putETH('random-key', 0, {
          value: 1,
        }),
      ).to.be.revertedWith('AmountMustBeGreaterThanZero()')
    })

    it('putETH fails when value is not larger than amount', async () => {
      await expect(
        contract.putETH('random-key', 1, {
          value: 1,
        }),
      ).to.be.revertedWith('ValueMustBeGreaterThanAmount()')
    })

    it('putETH fails when not enough value for extra gas', async () => {
      const value = 6
      const amount = 5
      const requiredGas = (await contract.getRequiredGas()).toNumber()

      await expect(
        contract.putETH('random-key', amount, { value }),
      ).to.be.revertedWith(
        `NotEnoughEthForExtraGas(${value - amount}, ${requiredGas})`,
      )
    })

    it.skip('putETH saves gift', async () => {
      const amount = 1
      const requiredGas = (await contract.getRequiredGas()).toNumber()
      const value = amount + requiredGas

      await expect(
        contract.putETH('random-key', amount, {
          value,
        }),
      ).to.be.revertedWith('ValueMustBeGreaterThanAmount()')
    })
  })
})
