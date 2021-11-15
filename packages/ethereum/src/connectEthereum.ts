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
  Observable,
  mapTo,
  withLatestFrom,
  combineLatest,
  distinctUntilChanged,
  defer,
  switchMapTo,
} from 'rxjs'
import detectEthereumProvider from '@metamask/detect-provider'

const NoEthereumProviderError = () => new Error('No Ethereum provider found')

const getEthereumProvider = (privateKey?: string) =>
  privateKey
    ? Promise.resolve(new ethers.providers.JsonRpcProvider()).then(
        (provider) => ({
          ethereum: null,
          provider,
          getSigner: () => new ethers.Wallet(privateKey, provider),
        }),
      )
    : detectEthereumProvider({
        silent: true,
        timeout: 1000,
      }).then((ethereum) => {
        if (!ethereum) throw NoEthereumProviderError
        const provider = new ethers.providers.Web3Provider(ethereum, 'any')
        return {
          ethereum: ethereum as import('eip1193-provider').default,
          provider,
          getSigner: () => provider.getSigner(0),
        }
      })

const getContractAddress = () =>
  import('../contracts-ts/addresses.json').then(
    (addresses) => addresses.localhost.Cryptogift,
  )

export function connectEthereum(PK?: string) {
  const ethereumProviderPromise = getEthereumProvider(PK)
  const ethereumProvider$ = from(ethereumProviderPromise).pipe(shareReplay(1))

  const network$ = ethereumProvider$.pipe(
    switchMap(({ provider }) => fromEvent(provider, 'network', identity)),
    startWith(void 0),
    tap((v) => console.log('network$', v)),
    shareReplay(1),
  )

  const block$ = ethereumProvider$.pipe(
    switchMap(({ provider }) => fromEvent(provider, 'block')),
    tap((v) => console.log('blockUpdate$', v)),
  )

  const address$ = ethereumProvider$.pipe(
    switchMap(({ ethereum, provider }) =>
      concat(
        from(provider.send('eth_accounts', [])),
        fromEvent(ethereum, 'accountsChanged'),
      ),
    ),
    map(([address]) => address || null),
    startWith(void 0),
    distinctUntilChanged(),
    tap((v) => console.log('address$', v)),
    shareReplay(1),
  )

  const user$ = combineLatest([ethereumProvider$, address$, network$]).pipe(
    switchMap(async ([{ provider, getSigner }, address]) => {
      const getBalance = () => getSigner().getBalance().then(utils.formatEther)
      return address
        ? {
            address,
            name: await provider.lookupAddress(address).catch(() => null),
            avatar: '', //TODO: fetch avatar
            getBalance,
            balance$: block$.pipe(
              switchMapTo(defer(getBalance)),
              distinctUntilChanged(),
            ),
          }
        : null
    }),
    tap((v) => console.log('user$', v)),
  )

  const connectAccount = () =>
    ethereumProviderPromise.then(({ provider }) =>
      provider.send('eth_requestAccounts', []),
    )

  const changeNetwork = () => {}

  const signer$ = combineLatest([ethereumProvider$, address$, network$]).pipe(
    map(([{ getSigner, provider }], address) =>
      address ? getSigner() : provider,
    ),
    tap((v) => console.log('signer$', v)),
  )

  const contract$ = signer$.pipe(
    withLatestFrom(defer(getContractAddress)),
    switchMap(([signer, address]) =>
      import('../contracts-ts').then(({ CryptoGifts__factory }) =>
        CryptoGifts__factory.connect(address, signer),
      ),
    ),
    tap((v) => console.log('contract$', v)),
  )

  return {
    network$,
    address$,
    contract$,
    user$,
    block$,
    connectAccount,
    changeNetwork,
  }
}

// declare global {
//   interface Window {
//     ethereum?: import('eip1193-provider').default
//   }
// }
