# Cryptogifts 🎁

Send crypto to people without wallets

## How does it work

With cryptogifts you can create redeemable crypto gift cards and send them to people. The recipient can redeem the gift card and get the crypto into their wallet.

On Ethereum/Arbitrum/Polygon/Optimism, you can send ETH, ERC20 tokens, or NFTs (ERC721) such as ENS domains.

On Solana you can send SOL tokens.

## Under the hood

When a sender creates a gift by sending crypto to the gift contract, the contract will create a new gift card with the sender's address as the sender. The gift card will expire after a certain amount of time.

The sender creates a gift card by sending the assets to the gift contract with some extra ETH to cover gas costs associated with redeeming the gift card.

For a person redeeming the card there are two possibilities that depend on whether the person has crypto in their wallet or not. With crypto there is no problem - the redeemer calls the contract with proof of knowing the gift ID and the contract releases the gift to redeemer's wallet.

If the redeemer doesn't have any crypto, they can't pay gas fees to redeem the funds. In this case, the redeemer would call Cryptogifts backend with the gift ID and a signed transaction that would redeem the funds to the redeemer's wallet. The following happens in two steps. First, the redeemer receives just enough ETH to cover the gas fees. When this is confirmed, the previously signed transaction to redeem the gift is sent to the network and the contract unlocks the assets.

## Supported chains and asset types

### Ethereum

Asset types:

- [ ] ETH
- [ ] ERC20
- [ ] ERC721 (NFT)

Layer 1:

- [ ] Ethereum Mainnet
- [ ] Rinkeby
- [ ] Ropsten
- [ ] Kovan

Layer 2:

- [ ] Arbitrum
- [ ] Polygon
- [ ] Optimism

### Solana

Asset Types:

- [ ] SOL
- [ ] NFTs
