import { utils } from 'ethers'
import { nanoid } from 'nanoid'

console.log('hello', nanoid())

console.log(utils.id('hello'))

const input = 'hello' /*?*/

const hashOneLong = utils.keccak256(utils.toUtf8Bytes(input))

utils.toUtf8String(utils.toUtf8Bytes(input)) /*?*/

const doubleHashed = utils.keccak256(
  utils.keccak256(utils.toUtf8Bytes(input)),
) /*?*/

const hashOne = utils.id(input) /*?*/

const byte32 = utils.formatBytes32String(
  'hell asdlsdkfjsaldfk so worlsadasfsdf dsf sdaf sdd thisasdfasdfsadf is interesting'.substr(
    0,
    31,
  ),
)
byte32

/**
 *
 * Step 0. ID = nanoid()
 * Step 1. putETH(hash(hash(ID)))
 * Step 2. give friend ID
 * Step 3. friend calls backend with hash(ID)
 * Step 4. Backend checks if the hash is OK
 *
 */
