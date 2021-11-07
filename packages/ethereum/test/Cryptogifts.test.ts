import { expect } from 'chai'
import { ethers } from 'hardhat'
import { BigNumber, Signer, utils } from 'ethers'
import { nanoid } from 'nanoid'
import { CryptoGifts, CryptoGifts__factory } from '../contracts'

describe('Cryptogifts', () => {
  let contractFactory: CryptoGifts__factory
  let contract: CryptoGifts
  let owner: Signer
  let giverAddr1: Signer

  before(async () => {
    ;[owner, giverAddr1] = await ethers.getSigners()

    contractFactory = (await ethers.getContractFactory(
      'CryptoGifts',
    )) as CryptoGifts__factory
  })

  beforeEach(async () => {
    contract = (await contractFactory.deploy()).connect(owner)
  })

  describe('getRequiredGas', async () => {
    const MINIMUM_GAS = BigNumber.from(1) // wei

    it('getRequiredGas retuns value greater than zero', async () => {
      const requiredGas = await contract.getRequiredGas()
      expect(requiredGas).to.be.gt(MINIMUM_GAS)
    })
  })

  describe('hashing', async () => {
    it('hashString', async () => {
      const input = nanoid()
      const hashed = utils.id(input)
      const contractHashed = await contract.hashString(input)

      expect(contractHashed).to.eq(hashed)
    })

    it('hashStringToString', async () => {
      const input = 'test'
      const hashed = utils.id(input)
      const contractHashed = await contract.hashStringToString(input)

      expect(contractHashed).to.eq(hashed)
    })

    it('hashBytes', async () => {
      const input = nanoid()

      const bytes = utils.formatBytes32String(input.substr(0, 31))

      const hashed = utils.keccak256(bytes)

      const contractHashed = await contract.hashBytes(bytes)

      expect(contractHashed).to.equal(hashed)
    })

    it('hashHash', async () => {
      const input = nanoid()
      const hashedHashed = utils.keccak256(
        utils.keccak256(utils.toUtf8Bytes(input)),
      )

      const contractHashed = await contract.hashHash(input)

      expect(contractHashed).to.equal(hashedHashed)
    })

    it('hashHashAlt', async () => {
      const input = utils.id('hello')
      const hashedHashed = utils.keccak256(
        utils.keccak256(utils.toUtf8Bytes(input)),
      )

      const contractHashed = await contract.hashHashAlt(input)

      expect(contractHashed).to.equal(hashedHashed)
    })

    it('bytes32ToString', async () => {
      const input = nanoid().slice(0, 31)

      const bytes32 = utils.formatBytes32String(input)

      const contractString = await contract.bytes32ToString(bytes32)

      expect(contractString).to.equal(input)
    })
  })

  describe('putETH', async () => {
    it('putETH fails without value', async () => {
      await expect(contract.putETH(nanoid(), 1)).to.be.revertedWith(
        'ValueMustBeGreaterThanZero()',
      )
    })

    it('putETH fails without amount', async () => {
      await expect(
        contract.putETH(nanoid(), 0, {
          value: 1,
        }),
      ).to.be.revertedWith('AmountMustBeGreaterThanZero()')
    })

    it('putETH fails when value is not larger than amount', async () => {
      await expect(
        contract.putETH(nanoid(), 1, {
          value: 1,
        }),
      ).to.be.revertedWith('ValueMustBeGreaterThanAmount()')
    })

    it('putETH fails when not enough value for extra gas', async () => {
      const amount = 1
      const value = 2
      const requiredGas = await contract.getRequiredGas()

      await expect(
        contract.putETH(nanoid(), amount, { value }),
      ).to.be.revertedWith(
        `NotEnoughEthForExtraGas(${value - amount}, ${requiredGas})`,
      )
    })

    it('putETH saves gift', async () => {
      const addr1Contract = contract.connect(giverAddr1)
      const key = nanoid()
      const requiredGas = await addr1Contract.getRequiredGas()
      const amount = utils.parseEther('1')
      const value = amount.add(requiredGas)

      await expect(() =>
        addr1Contract.putETH(key, amount, {
          value,
        }),
      ).changeEtherBalances(
        [giverAddr1, owner, contract],
        [BigNumber.from(0).sub(value), requiredGas, amount],
      )
    })

    it.skip('provideTranswerETH', async () => {
      const addr1Contract = contract.connect(giverAddr1)
      const key = nanoid()
      const requiredGas = await addr1Contract.getRequiredGas()
      const amount = utils.parseEther('1')
      const value = amount.add(requiredGas)
      await addr1Contract.putETH(key, amount, {
        value,
      })
    })
  })
})
