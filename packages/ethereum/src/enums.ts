export enum Chain {
  Mainnet = 0,
  Rinkeby = 1,
  Ropsten = 3,
  Kovan = 42,
  Hardhat = 31337,
}

export enum GiftType {
  ETH,
  ERC20,
  ERC721,
}

export enum GiftStatus {
  NONE,
  PENDING,
  REDEEMED,
  REVOKED,
}
