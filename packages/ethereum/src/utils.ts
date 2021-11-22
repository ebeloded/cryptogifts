import { utils } from 'ethers'

export const hash = (v: string) => utils.keccak256(utils.toUtf8Bytes(v))
export const hashHash = (v: string) => utils.keccak256(hash(v))
