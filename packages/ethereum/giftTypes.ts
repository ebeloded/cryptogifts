type Address = string

interface GiftBase {
  from: Address
  transferBalance: number
  expires: Date
  notifySender: boolean
}

interface EthGift extends GiftBase {
  type: 'ETH'
  amount: number
}

interface TokenGift extends GiftBase {
  contractAddress: string
}

interface ERC20TokenGift extends TokenGift {
  type: 'ERC20'
  amount: number
}

interface ERC721TokenGift extends TokenGift {
  type: 'ERC721'
}

type Gift = EthGift | ERC20TokenGift | ERC721TokenGift
