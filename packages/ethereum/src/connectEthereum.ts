import { ethers, utils, Wallet } from 'ethers'
import {
  from,
  switchMap,
  fromEvent,
  startWith,
  identity,
  shareReplay,
  map,
  concat,
  tap,
  combineLatest,
  distinctUntilChanged,
  defer,
  filter,
  of,
} from 'rxjs'
import type { ChainInfo, FeeData } from './types'

import detectEthereumProvider from '@metamask/detect-provider'
import { chains } from './data'

console.log({ chains })

type EthereumProvider = import('eip1193-provider').default

const NoEthereumProviderError = () => new Error('No Ethereum provider found')

const ADDRESSES = {
  Localhost: () => import('../addresses/localhost.json'),
  Hardhat: () => import('../addresses/hardhat.json'),
  Ropsten: () => import('../addresses/ropsten.json'),
  Rinkeby: () => import('../addresses/rinkeby.json'),
}

const getEthereumProvider = (dev: boolean, chainId?: number) =>
  dev
    ? Promise.resolve(
        chainId && chains.get(chainId)
          ? new ethers.providers.JsonRpcProvider({
              url: chains.get(chainId)?.rpcUrls?.[0]!,
            })
          : new ethers.providers.JsonRpcProvider(),
      ).then((provider) => ({
        ethereum: null,
        provider,
      }))
    : detectEthereumProvider({
        silent: true,
        timeout: 1000,
      }).then((ethereum) => {
        if (!ethereum) return { ethereum: null, provider: null }
        return {
          ethereum: ethereum as EthereumProvider,
          provider: new ethers.providers.Web3Provider(ethereum as any, 'any'),
        }
      })

const getAddressFile = async (chainId: number) =>
  ADDRESSES[chains.get(chainId)?.chainName as keyof typeof ADDRESSES]?.() ??
  void 0

const getContractAddress = (chainId: number) => async () =>
  getAddressFile(chainId).then((file) => {
    if (!file) throw new Error('No contract address found')
    return file.Cryptogifts
  })

export function connectEthereum(privateKey?: string, chainId?: number) {
  console.log('connectEthereum', { chainId })
  const ethereumProviderPromise = getEthereumProvider(!!privateKey, chainId)

  const ethereumProvider$ = from(ethereumProviderPromise).pipe(
    tap((v) => console.log('ethereumProvider$', v)),
    shareReplay(1),
  )

  const network$ = ethereumProvider$.pipe(
    switchMap(({ provider }) =>
      provider
        ? concat(
            provider.getNetwork(),
            fromEvent(provider, 'network', identity),
          )
        : of(null),
    ),
    tap((v) => console.log('network$', v)),
    startWith(void 0),
    shareReplay(1),
  )

  const contractAddress$ = chainId
    ? defer(getContractAddress(chainId))
    : network$.pipe(
        filter((n) => !!n),
        switchMap((n) => defer(getContractAddress(n.chainId))),
      )

  const signer$ = ethereumProvider$.pipe(
    map(({ provider }) =>
      provider
        ? () =>
            privateKey
              ? new ethers.Wallet(privateKey, provider)
              : provider.getSigner(0)
        : null,
    ),
  )

  const block$ = combineLatest([ethereumProvider$, network$]).pipe(
    switchMap(([{ provider }]) =>
      provider
        ? concat(provider.getBlockNumber(), fromEvent(provider, 'block'))
        : of(null),
    ),
    startWith(void 0),
    tap((v) => console.log('blockUpdate$', v)),
  )

  const address$ = combineLatest([ethereumProvider$, signer$]).pipe(
    switchMap(([{ ethereum, provider }, signer]) =>
      provider
        ? ethereum
          ? concat(
              from(provider.send('eth_accounts', [])),
              fromEvent(ethereum, 'accountsChanged'),
            ).pipe(map(([address]) => address || null))
          : signer
          ? from(signer().getAddress())
          : of(null)
        : of(null),
    ),
    distinctUntilChanged(),
    startWith(void 0),
    tap((v) => console.log('address$', v)),
    shareReplay(1),
  )

  const user$ = combineLatest([
    ethereumProvider$,
    address$,
    network$,
    signer$,
  ]).pipe(
    filter(([, address, network]) => address !== void 0 && network !== void 0),
    switchMap(async ([{ provider }, address, network, signer]) => {
      if (provider && signer) {
        const getBalance = (addr: string) =>
          provider.getBalance(addr).then(utils.formatEther)

        return address && network
          ? {
              signer: signer() as Wallet,
              address,
              name: await provider.lookupAddress(address).catch(() => null),
              avatar: await provider.getAvatar(address).catch(() => null),
              getBalance,
              balance$: combineLatest([
                ethereumProvider$,
                address$,
                network$,
                block$,
              ]).pipe(
                switchMap(([{ provider }, address]) =>
                  provider ? provider.getBalance(address) : of(null),
                ),
                distinctUntilChanged((prev, cur) => prev?._hex === cur?._hex),
                tap((balance) => console.log('balance$', balance)),
                shareReplay(1),
              ),
            }
          : null
      } else {
        return null
      }
    }),
    startWith(void 0),
    tap((v) => console.log('user$', v)),
    shareReplay(1),
  )

  const contractSigner$ = combineLatest([
    ethereumProvider$,
    address$,
    signer$,
    network$,
  ]).pipe(
    map(([{ provider }, address, signer]) =>
      address && signer ? signer() : provider!,
    ),
    shareReplay(1),
  )

  const contract$ = combineLatest([contractAddress$, contractSigner$]).pipe(
    tap(([address, signer]) => console.log('contract$', { address, signer })),
    switchMap(([contractAddress, contractSigner]) =>
      import('../contracts-ts').then(({ Cryptogifts__factory }) =>
        Cryptogifts__factory.connect(contractAddress, contractSigner),
      ),
    ),
  )

  const getGift$ = (hashHashKey: string) =>
    combineLatest([contract$, block$]).pipe(
      switchMap(([contract]) => contract.get(hashHashKey)),
    )

  const connectAccount = () =>
    ethereumProviderPromise.then(({ provider }) =>
      provider!.send('eth_requestAccounts', []),
    )
  const getFeeData = (): Promise<FeeData | null> =>
    ethereumProviderPromise.then(({ provider }) =>
      provider ? provider.getFeeData() : null,
    )

  const changeNetwork = (chainInfo: ChainInfo) => {
    console.log('changeNetwork', { chainInfo })
    ethereumProviderPromise.then(({ ethereum }) => {
      if (!ethereum) throw NoEthereumProviderError()

      return ethereum
        .request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: chainInfo.chainId }],
        })
        .then(
          () => {
            console.log('switched!')
          },
          (switchError) => {
            console.log({ switchError })
            if (switchError.code === 4902) {
              return ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [chainInfo],
              })
            }
          },
        )
    })
  }

  return {
    network$,
    address$,
    contract$,
    user$,
    block$,
    getGift$,
    getFeeData,
    connectAccount,
    changeNetwork,
  }
}

// declare global {
//   interface Window {
//     ethereum?: import('eip1193-provider').default
//   }
// }
