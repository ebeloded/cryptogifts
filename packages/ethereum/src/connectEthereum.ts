import { ethers, utils } from 'ethers'
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
} from 'rxjs'
import detectEthereumProvider from '@metamask/detect-provider'

const NoEthereumProviderError = () => new Error('No Ethereum provider found')

const getEthereumProvider = (dev: boolean) =>
  dev
    ? Promise.resolve(new ethers.providers.JsonRpcProvider()).then(
        (provider) => ({
          ethereum: null,
          provider,
        }),
      )
    : detectEthereumProvider({
        silent: true,
        timeout: 1000,
      }).then((ethereum) => {
        if (!ethereum) throw NoEthereumProviderError
        return {
          ethereum: ethereum as import('eip1193-provider').default,
          provider: new ethers.providers.Web3Provider(ethereum, 'any'),
        }
      })

const getContractAddress = () =>
  import('../contracts-ts/addresses.json').then(
    (addresses) => addresses.localhost.Cryptogift,
  )

export function connectEthereum(privateKey?: string) {
  const ethereumProviderPromise = getEthereumProvider(!!privateKey)

  const ethereumProvider$ = from(ethereumProviderPromise).pipe(
    tap((v) => console.log('ethereumProvider$', v)),
    shareReplay(1),
  )

  const network$ = ethereumProvider$.pipe(
    switchMap(({ provider }) =>
      concat(provider.getNetwork(), fromEvent(provider, 'network', identity)),
    ),
    tap((v) => console.log('network$', v)),
    startWith(void 0),
    shareReplay(1),
  )

  const signer$ = ethereumProvider$.pipe(
    map(
      ({ provider, ethereum }) =>
        () =>
          ethereum
            ? provider.getSigner(0)
            : new ethers.Wallet(privateKey, provider),
    ),
  )

  const block$ = combineLatest([ethereumProvider$, network$]).pipe(
    switchMap(([{ provider }]) =>
      concat(provider.getBlockNumber(), fromEvent(provider, 'block')),
    ),
    startWith(void 0),
    tap((v) => console.log('blockUpdate$', v)),
  )

  const address$ = combineLatest([ethereumProvider$, signer$]).pipe(
    switchMap(([{ ethereum, provider }, signer]) =>
      ethereum
        ? concat(
            from(provider.send('eth_accounts', [])),
            fromEvent(ethereum, 'accountsChanged'),
          ).pipe(map(([address]) => address || null))
        : from(signer().getAddress()),
    ),
    distinctUntilChanged(),
    startWith(void 0),
    tap((v) => console.log('address$', v)),
    shareReplay(1),
  )

  const user$ = combineLatest([ethereumProvider$, address$, network$]).pipe(
    filter(([, address, network]) => address !== void 0 && network !== void 0),
    switchMap(async ([{ provider }, address, network]) => {
      const getBalance = (addr: string) =>
        provider.getBalance(addr).then(utils.formatEther)

      return address && network
        ? {
            address,
            name: await provider.lookupAddress(address).catch(() => null),
            avatar: '', //TODO: fetch avatar
            getBalance,
            balance$: combineLatest([
              ethereumProvider$,
              address$,
              network$,
              block$,
            ]).pipe(
              switchMap(([{ provider }, address]) =>
                provider.getBalance(address).then(utils.formatEther),
              ),
              distinctUntilChanged(),
              shareReplay(1),
            ),
          }
        : null
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
    map(([{ provider }, address, signer]) => (address ? signer() : provider)),
    shareReplay(1),
  )

  const contract$ = combineLatest([
    defer(getContractAddress),
    contractSigner$,
  ]).pipe(
    switchMap(([contractAddress, contractSigner]) =>
      import('../contracts-ts').then(({ CryptoGifts__factory }) =>
        CryptoGifts__factory.connect(contractAddress, contractSigner),
      ),
    ),
  )

  const connectAccount = () =>
    ethereumProviderPromise.then(({ provider }) =>
      provider.send('eth_requestAccounts', []),
    )

  const getFeeData = () =>
    ethereumProviderPromise.then(({ provider }) => provider.getFeeData())

  const changeNetwork = () => {
    throw new Error('Not implemented')
  }

  return {
    network$,
    address$,
    contract$,
    user$,
    block$,
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
