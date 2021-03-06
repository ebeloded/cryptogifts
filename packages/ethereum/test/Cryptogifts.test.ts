import { expect } from 'chai'
import { ethers } from 'hardhat'
import { BigNumber, Signer, utils } from 'ethers'
import { nanoid } from 'nanoid'
import { Cryptogifts, Cryptogifts__factory } from '../contracts-ts'
import { FeeData } from '@ethersproject/abstract-provider'

const hash = (v: string) => utils.keccak256(utils.toUtf8Bytes(v))
const hashHash = (v: string) => utils.keccak256(hash(v))

enum GiftType {
  ETH = 0,
  ERC20 = 1,
  ERC721 = 2,
}

enum GiftStatus {
  NONE = 0,
  PENDING = 1,
  REDEEMED = 2,
}

describe('Cryptogifts', async () => {
  let contractFactory: Cryptogifts__factory
  let contract: Cryptogifts
  let contract_giver: Cryptogifts
  let contract_owner: Cryptogifts
  let ownerAddr: Signer
  let giverAddr: Signer
  let receiverAddr: Signer
  let feeData: FeeData

  before(async () => {
    feeData = await ethers.provider.getFeeData()
    ;[ownerAddr, giverAddr, receiverAddr] = await ethers.getSigners()

    contractFactory = (await ethers.getContractFactory(
      'Cryptogifts',
    )) as Cryptogifts__factory

    contract = await contractFactory.deploy()
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

  beforeEach(async () => {
    contract_owner = contract.connect(ownerAddr)
    contract_giver = contract.connect(giverAddr)
  })

  it('getRequiredGas retuns value greater than zero', async () => {
    const MINIMUM_GAS = BigNumber.from(0)
    const requiredGas = await contract.getRequiredGas()
    expect(requiredGas).to.be.gt(MINIMUM_GAS)
  })

  it('getMyGifts', async () => {
    expect(await contract.getMyGifts()).to.be.empty
  })

  it('putETH fails without value', async () => {
    const hashHashKey = hashHash(nanoid())
    await expect(contract_giver.putETH(hashHashKey, 1)).to.be.revertedWith(
      'ValueMustBeGreaterThanZero()',
    )
  })

  it('putETH fails without giftValue', async () => {
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

  it('putETH saves gift', async () => {
    const key = nanoid()
    const hashHashKey = hashHash(key)
    const requiredGas = await contract_giver.getRequiredGas()
    const extraValueForFees = feeData.maxFeePerGas.mul(requiredGas)
    const giftValue = utils.parseEther('1')
    const value = giftValue.add(extraValueForFees)

    expect(await contract_giver.getMyGifts()).to.be.empty

    await expect(() =>
      contract_giver.putETH(hashHashKey, giftValue, {
        value,
      }),
    ).changeEtherBalances(
      [giverAddr, ownerAddr, contract_giver],
      [
        BigNumber.from(0).sub(value),
        extraValueForFees.div(2),
        giftValue.add(extraValueForFees.div(2)),
      ],
    )

    expect(await contract_giver.getMyGifts()).to.have.lengthOf(1)

    await expect(contract_giver.has(hashHashKey)).to.be.reverted

    expect(await contract_owner.has(hashHashKey)).to.be.true

    const gift = await contract_owner.get(hashHashKey)

    expect(gift.sender).to.eq(await contract_giver.signer.getAddress())
    expect(gift.giftValue).to.eq(giftValue)
    expect(gift.giftType).to.eq(GiftType.ETH)
  })

  it('redeemGift', async () => {
    const key = nanoid()
    const hashHashKey = hashHash(key)
    const requiredGas = await contract_giver.getRequiredGas()
    const extraValueForFees = feeData.maxFeePerGas.mul(requiredGas)
    const giftValue = utils.parseEther('1')
    const value = giftValue.add(extraValueForFees)

    await contract_giver.putETH(hashHashKey, giftValue, {
      value,
    })

    const contract_receiver = contract.connect(receiverAddr)

    await expect(contract_receiver.redeemGift('wrong key')).to.be.revertedWith(
      `WrongKey`,
    )

    expect(await contract_owner.has(hashHashKey)).to.be.true

    await expect(() => contract_receiver.redeemGift(key)).changeEtherBalances(
      [receiverAddr, contract, giverAddr],
      [
        giftValue,
        BigNumber.from(0).sub(giftValue).sub(extraValueForFees.div(2)),
        extraValueForFees.div(2),
      ],
    )

    const gift = await contract_owner.get(hashHashKey)

    expect(gift.redeemer).to.eq(await receiverAddr.getAddress())
    expect(gift.status).equal(GiftStatus.REDEEMED)

    await expect(contract_receiver.redeemGift(key)).to.be.revertedWith(
      'GiftAlreadyRedeemed',
    )
  })

  it('provideTranswerETH', async () => {
    const key = nanoid()
    const hashKey = hash(key)
    const hashHashKey = hashHash(key)
    const requiredGas = await contract_giver.getRequiredGas()
    const amount = utils.parseEther('1')
    const value = amount.add(requiredGas)

    await contract_giver.putETH(hashHashKey, amount, {
      value,
    })

    const receiver = ethers.Wallet.createRandom().connect(ethers.provider)

    const receiverAddress = await receiver.getAddress()

    expect(await receiver.getBalance()).to.eq(0)

    await expect(
      contract_giver.provideTransferFee(receiverAddress, hashKey),
    ).to.be.revertedWith('Ownable: caller is not the owner')

    await expect(
      contract_owner.provideTransferFee(receiverAddress, hash('wrong-key')),
    ).to.be.revertedWith('WrongKey')

    await expect(() =>
      contract_owner.provideTransferFee(receiverAddress, hashKey),
    ).changeEtherBalances(
      [receiver, contract, ownerAddr],
      [requiredGas.div(2), BigNumber.from(0).sub(requiredGas.div(2)), 0],
    )

    await expect(
      contract_owner.provideTransferFee(receiverAddress, hashKey),
    ).to.be.revertedWith('NoGiftGas')

    const gift = await contract_owner.get(hashHashKey)

    expect(gift.giftGas).eq(0)
    expect(gift.status).equal(GiftStatus.PENDING)
  })
})
