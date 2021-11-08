import { expect } from 'chai'
import { ethers } from 'hardhat'
import { BigNumber, Signer, utils } from 'ethers'
import { nanoid } from 'nanoid'
import { CryptoGifts, CryptoGifts__factory } from '../contracts'

const hash = (v: string) => utils.keccak256(utils.toUtf8Bytes(v))
const hashHash = (v: string) => utils.keccak256(hash(v))
enum GiftType {
  ETH = 0,
  ERC20 = 1,
  ERC721 = 2,
}
describe('Cryptogifts', () => {
  let contractFactory: CryptoGifts__factory
  let contract: CryptoGifts
  let contract_giver: CryptoGifts
  let contract_owner: CryptoGifts
  let ownerAddr: Signer
  let giverAddr: Signer
  let receiverAddr: Signer

  before(async () => {
    ;[ownerAddr, giverAddr, receiverAddr] = await ethers.getSigners()

    contractFactory = (await ethers.getContractFactory(
      'CryptoGifts',
    )) as CryptoGifts__factory

    contract = await contractFactory.deploy()
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
      const input = nanoid(100)

      const hashed = hash(input)
      // const hashed = utils.solidityKeccak256(['string'], [input])
      const contractHashed = await contract.hashString(input)

      expect(contractHashed).to.eq(hashed)
    })

    it('hashBytes', async () => {
      const input = nanoid(100)

      const bytes = utils.toUtf8Bytes(input)

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

    it('hashHashedBytes', async () => {
      const input = nanoid(100)

      const hashed = utils.id(input)

      const hashedHashed = utils.keccak256(hashed)

      const contractHashedHashed = await contract.hashHash(input)

      expect(contractHashedHashed).to.equal(hashedHashed)

      const contractBytesHashed = await contract.hashBytes(hashed)

      expect(contractBytesHashed).to.equal(hashedHashed)
    })
  })

  describe.only('putETH', async () => {
    beforeEach(async () => {
      contract_owner = contract.connect(ownerAddr)
      contract_giver = contract.connect(giverAddr)
    })

    it('putETH fails without value', async () => {
      const hashHashKey = hashHash(nanoid())
      await expect(contract_giver.putETH(hashHashKey, 1)).to.be.revertedWith(
        'ValueMustBeGreaterThanZero()',
      )
    })

    it('putETH fails without amount', async () => {
      const hashHashKey = hashHash(nanoid())
      await expect(
        contract_giver.putETH(hashHashKey, 0, {
          value: 1,
        }),
      ).to.be.revertedWith('AmountMustBeGreaterThanZero()')
    })

    it('putETH fails when value is not larger than amount', async () => {
      const hashHashKey = hashHash(nanoid())

      await expect(
        contract_giver.putETH(hashHashKey, 1, {
          value: 1,
        }),
      ).to.be.revertedWith('ValueMustBeGreaterThanAmount()')
    })

    it('putETH fails when not enough value for extra gas', async () => {
      const amount = 1
      const value = 2
      const requiredGas = await contract_giver.getRequiredGas()
      const hashHashKey = hashHash(nanoid())

      await expect(
        contract_giver.putETH(hashHashKey, amount, { value }),
      ).to.be.revertedWith(
        `NotEnoughEthForExtraGas(${value - amount}, ${requiredGas})`,
      )
    })

    it.only('putETH saves gift', async () => {
      const key = nanoid()
      const hashHashKey = hashHash(key)
      const requiredGas = await contract_giver.getRequiredGas()
      const amount = utils.parseEther('1')
      const value = amount.add(requiredGas)

      await expect(() =>
        contract_giver.putETH(hashHashKey, amount, {
          value,
        }),
      ).changeEtherBalances(
        [giverAddr, ownerAddr, contract_giver],
        [BigNumber.from(0).sub(value), requiredGas, amount],
      )

      await expect(contract_giver.has(hashHashKey)).to.be.reverted

      expect(await contract_owner.has(hashHashKey)).to.be.true

      const gift = await contract_owner.get(hashHashKey)

      expect(gift.from).to.eq(await contract_giver.signer.getAddress())
      expect(gift.amount).to.eq(amount)
      expect(gift.giftType).to.eq(GiftType.ETH)
    })

    it.only('redeemGift', async () => {
      const key = nanoid()
      const hashKey = hash(key)
      const hashHashKey = hashHash(key)
      const requiredGas = await contract_giver.getRequiredGas()
      const amount = utils.parseEther('1')
      const value = amount.add(requiredGas)
      await contract_giver.putETH(hashHashKey, amount, {
        value,
      })

      const contract_receiver = contract.connect(receiverAddr)

      await expect(
        contract_receiver.redeemGift('wrong key'),
      ).to.be.revertedWith(`WrongKey`)

      expect(await contract_owner.has(hashHashKey)).to.be.true

      await expect(() => contract_receiver.redeemGift(key)).changeEtherBalances(
        [receiverAddr, contract],
        [amount, BigNumber.from(0).sub(amount)],
      )

      expect(await contract_owner.has(hashHashKey)).to.be.false
    })

    it.skip('provideTranswerETH', async () => {
      const key = nanoid()
      const hashKey = hash(key)
      const hashHashKey = hashHash(key)
      const requiredGas = await contract_giver.getRequiredGas()
      const amount = utils.parseEther('1')
      const value = amount.add(requiredGas)
      await contract_giver.putETH(hashHashKey, amount, {
        value,
      })

      const receiver = ethers.Wallet.createRandom()

      const receiverAddress = await receiver.getAddress()

      console.log({ receiverAddress, hashKey })

      await expect(contract_giver.provideTransferETH(receiverAddress, hashKey))
        .to.be.reverted
    })
  })
})
