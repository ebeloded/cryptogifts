import { ethers } from 'ethers'
import {
  from,
  switchMap,
  fromEvent,
  startWith,
  identity,
  shareReplay,
  withLatestFrom,
  merge,
  empty,
  map,
  concat,
  tap,
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

export function connectEthereum(PK?: string) {
  const ethereumProviderPromise = getEthereumProvider(PK)
  const ethereumProvider$ = from(ethereumProviderPromise).pipe(shareReplay(1))

  const network$ = ethereumProvider$.pipe(
    switchMap(({ provider }) => fromEvent(provider, 'network', identity)),
    startWith(void 0),
  )
  const account$ = ethereumProvider$
    .pipe(
      switchMap(({ ethereum, provider }) =>
        concat(
          from(provider.send('eth_accounts', [])),
          fromEvent(ethereum, 'accountsChanged'),
        ),
      ),
      map(([account]) => account),
      startWith(void 0),
    )
    .pipe(tap((v) => console.log('account', v)))
  const contract = ''

  return {
    network$,
    account$,
    contract,
    async connectAccount() {},
    async setNetwork(network: any) {},
  }
}

// declare global {
//   interface Window {
//     ethereum?: import('eip1193-provider').default
//   }
// }
