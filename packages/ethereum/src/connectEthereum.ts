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
  iif,
  EMPTY,
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
        console.log('using Web3Provider')
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

  const block$ = combineLatest([ethereumProvider$, network$]).pipe(
    switchMap(([{ provider }]) =>
      concat(provider.getBlockNumber(), fromEvent(provider, 'block')),
    ),
    startWith(void 0),
    tap((v) => console.log('blockUpdate$', v)),
  )

  const address$ = ethereumProvider$.pipe(
    switchMap(({ ethereum, provider, getSigner }) =>
      ethereum
        ? concat(
            from(provider.send('eth_accounts', [])).pipe(
              tap((v) => console.log('accounts', v)),
            ),
            fromEvent(ethereum, 'accountsChanged'),
          ).pipe(map(([address]) => address || null))
        : from(getSigner().getAddress()).pipe(
            tap((v) => console.log('address', v)),
          ),
    ),
    distinctUntilChanged(),
    startWith(void 0),
    tap((v) => console.log('address$', v)),
    shareReplay(1),
  )

  const user$ = combineLatest([ethereumProvider$, address$, network$]).pipe(
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
              tap((balance) => {
                console.log('balance$', balance)
              }),
              shareReplay(1),
            ),
          }
        : null
    }),
    startWith(void 0),
    tap((v) => console.log('user$', v)),
    shareReplay(1),
  )

  const signer$ = combineLatest([ethereumProvider$, address$, network$]).pipe(
    map(([{ getSigner, provider }], address) =>
      address ? getSigner() : provider,
    ),
    tap((v) => console.log('signer$', v)),
    shareReplay(1),
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

  const connectAccount = () =>
    ethereumProviderPromise.then(({ provider }) =>
      provider.send('eth_requestAccounts', []),
    )

  const getFeeData = () =>
    ethereumProviderPromise.then(({ provider }) => provider.getFeeData())

  const changeNetwork = () => {}

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
