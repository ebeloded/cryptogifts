/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { CryptoGifts, CryptoGiftsInterface } from "../CryptoGifts";

const _abi = [
  {
    inputs: [],
    name: "AmountMustBeGreaterThanZero",
    type: "error",
  },
  {
    inputs: [],
    name: "GiftAlreadyRedeemed",
    type: "error",
  },
  {
    inputs: [],
    name: "GiftAlreadyRevoked",
    type: "error",
  },
  {
    inputs: [],
    name: "NoGiftGas",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "provided",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "required",
        type: "uint256",
      },
    ],
    name: "NotEnoughGiftGas",
    type: "error",
  },
  {
    inputs: [],
    name: "ValueMustBeGreaterThanAmount",
    type: "error",
  },
  {
    inputs: [],
    name: "ValueMustBeGreaterThanZero",
    type: "error",
  },
  {
    inputs: [],
    name: "WrongKey",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_hashHashKey",
        type: "bytes",
      },
    ],
    name: "get",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "address",
            name: "redeemer",
            type: "address",
          },
          {
            internalType: "enum GiftStatus",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "enum GiftType",
            name: "giftType",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "giftValue",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "giftGas",
            type: "uint256",
          },
        ],
        internalType: "struct Gift",
        name: "gift",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_hashHashKey",
        type: "bytes",
      },
    ],
    name: "getGiftGasValue",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMyGifts",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "address",
            name: "redeemer",
            type: "address",
          },
          {
            internalType: "enum GiftStatus",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "enum GiftType",
            name: "giftType",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "giftValue",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "giftGas",
            type: "uint256",
          },
        ],
        internalType: "struct Gift[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRequiredGas",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_hashHashKey",
        type: "bytes",
      },
    ],
    name: "has",
    outputs: [
      {
        internalType: "bool",
        name: "exists",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_key",
        type: "bytes",
      },
    ],
    name: "hashBytes",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_key",
        type: "string",
      },
    ],
    name: "hashHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_key",
        type: "string",
      },
    ],
    name: "hashString",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_receiver",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_hashKey",
        type: "bytes",
      },
    ],
    name: "provideTransferETH",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_hashHashKey",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "_giftValue",
        type: "uint256",
      },
    ],
    name: "putETH",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_key",
        type: "string",
      },
    ],
    name: "redeemGift",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5062000032620000266200003860201b60201c565b6200004060201b60201c565b62000104565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6128c780620001146000396000f3fe6080604052600436106100dd5760003560e01c80638da5cb5b1161007f578063d6d7d52511610059578063d6d7d525146102b3578063ee39c1f8146102f0578063f2fde38b1461032d578063f3c062e914610356576100dd565b80638da5cb5b146102225780638f9087f51461024d578063ab04f8941461028a576100dd565b80636e03446c116100bb5780636e03446c14610166578063715018a6146101a357806372a0ca65146101ba578063766954b4146101e5576100dd565b80630776db96146100e257806320ef51cf1461011f57806364e7a1ad1461014a575b600080fd5b3480156100ee57600080fd5b5061010960048036038101906101049190611e58565b61037f565b6040516101169190612299565b60405180910390f35b34801561012b57600080fd5b506101346103fc565b604051610141919061225c565b60405180910390f35b610164600480360381019061015f9190611e00565b610833565b005b34801561017257600080fd5b5061018d60048036038101906101889190611dbb565b610c7a565b60405161019a919061233f565b60405180910390f35b3480156101af57600080fd5b506101b8610d24565b005b3480156101c657600080fd5b506101cf610dac565b6040516101dc919061233f565b60405180910390f35b3480156101f157600080fd5b5061020c60048036038101906102079190611e9d565b610dbc565b6040516102199190612299565b60405180910390f35b34801561022e57600080fd5b50610237610dec565b6040516102449190612241565b60405180910390f35b34801561025957600080fd5b50610274600480360381019061026f9190611dbb565b610e15565b6040516102819190612299565b60405180910390f35b34801561029657600080fd5b506102b160048036038101906102ac9190611e58565b610e48565b005b3480156102bf57600080fd5b506102da60048036038101906102d59190611dbb565b610fee565b6040516102e79190612324565b60405180910390f35b3480156102fc57600080fd5b5061031760048036038101906103129190611dbb565b611273565b604051610324919061227e565b60405180910390f35b34801561033957600080fd5b50610354600480360381019061034f9190611d3a565b61139e565b005b34801561036257600080fd5b5061037d60048036038101906103789190611d63565b611496565b005b60006103ce83838080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050610dbc565b6040516020016103de91906121df565b60405160208183030381529060405280519060200120905092915050565b60606000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020805480602002602001604051908101604052809291908181526020016000905b8282101561050b57838290600052602060002001805461047e906125fa565b80601f01602080910402602001604051908101604052809291908181526020018280546104aa906125fa565b80156104f75780601f106104cc576101008083540402835291602001916104f7565b820191906000526020600020905b8154815290600101906020018083116104da57829003601f168201915b50505050508152602001906001019061045f565b5050505090506000815167ffffffffffffffff811115610554577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60405190808252806020026020018201604052801561058d57816020015b61057a611a8a565b8152602001906001900390816105725790505b50905060005b825181101561082a5760018382815181106105d7577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200260200101516040516105ec9190612213565b90815260200160405180910390206040518060c00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160149054906101000a900460ff1660038111156106fc577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b6003811115610734577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b81526020016001820160159054906101000a900460ff166002811115610783577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60028111156107bb577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b81526020016002820154815260200160038201548152505082828151811061080c577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001018190525080806108229061265d565b915050610593565b50809250505090565b600034141561086e576040517f8565fcfe00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008114156108a9576040517f5e85ae7300000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8034116108e2576040517ffd732e9a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60006108ec610dac565b905080826108fa919061244f565b34101561094b57813461090d91906124d6565b816040517f5a1e176000000000000000000000000000000000000000000000000000000000815260040161094292919061235a565b60405180910390fd5b60006002833461095b91906124d6565b61096591906124a5565b905061096f610dec565b73ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501580156109b4573d6000803e3d6000fd5b5060006040518060c001604052803373ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff16815260200160016003811115610a35577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b815260200160006002811115610a74577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b81526020018581526020018381525090508060018787604051610a989291906121fa565b908152602001604051809103902060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160010160146101000a81548160ff02191690836003811115610b85577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b021790555060608201518160010160156101000a81548160ff02191690836002811115610bdb577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b02179055506080820151816002015560a08201518160030155905050600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020868690918060018154018082558091505060019003906000526020600020016000909192909192909192909192509190610c71929190611b5c565b50505050505050565b6000610c8461166c565b73ffffffffffffffffffffffffffffffffffffffff16610ca2610dec565b73ffffffffffffffffffffffffffffffffffffffff1614610cf8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610cef90612304565b60405180910390fd5b60018383604051610d0a9291906121fa565b908152602001604051809103902060030154905092915050565b610d2c61166c565b73ffffffffffffffffffffffffffffffffffffffff16610d4a610dec565b73ffffffffffffffffffffffffffffffffffffffff1614610da0576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d9790612304565b60405180910390fd5b610daa6000611674565b565b60006706f05b59d3b20000905090565b600081604051602001610dcf919061222a565b604051602081830303815290604052805190602001209050919050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60008282604051602001610e2a9291906121fa565b60405160208183030381529060405280519060200120905092915050565b60005a90506000610e59848461037f565b604051602001610e6991906121df565b60405160208183030381529060405290506000600182604051610e8c9190612213565b90815260200160405180910390209050610eb68160010160149054906101000a900460ff16611738565b15610f9d5760028160010160146101000a81548160ff02191690836003811115610f09577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b0217905550338160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055503373ffffffffffffffffffffffffffffffffffffffff166108fc82600201549081150290604051600060405180830381858888f19350505050158015610f9b573d6000803e3d6000fd5b505b610fe76040518060400160405280601381526020017f72656465656d47696674206761732075736564000000000000000000000000008152505a85610fe291906124d6565b6119c5565b5050505050565b610ff6611a8a565b610ffe61166c565b73ffffffffffffffffffffffffffffffffffffffff1661101c610dec565b73ffffffffffffffffffffffffffffffffffffffff1614611072576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161106990612304565b60405180910390fd5b600183836040516110849291906121fa565b90815260200160405180910390206040518060c00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160149054906101000a900460ff166003811115611194577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60038111156111cc577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b81526020016001820160159054906101000a900460ff16600281111561121b577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b6002811115611253577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b815260200160028201548152602001600382015481525050905092915050565b600061127d61166c565b73ffffffffffffffffffffffffffffffffffffffff1661129b610dec565b73ffffffffffffffffffffffffffffffffffffffff16146112f1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112e890612304565b60405180910390fd5b6000600381111561132b577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b6001848460405161133d9291906121fa565b908152602001604051809103902060010160149054906101000a900460ff166003811115611394577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b1415905092915050565b6113a661166c565b73ffffffffffffffffffffffffffffffffffffffff166113c4610dec565b73ffffffffffffffffffffffffffffffffffffffff161461141a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161141190612304565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141561148a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611481906122e4565b60405180910390fd5b61149381611674565b50565b61149e61166c565b73ffffffffffffffffffffffffffffffffffffffff166114bc610dec565b73ffffffffffffffffffffffffffffffffffffffff1614611512576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161150990612304565b60405180910390fd5b60005a905060006115238484610e15565b60405160200161153391906121df565b604051602081830303815290604052905060006001826040516115569190612213565b908152602001604051809103902090506115808160010160149054906101000a900460ff16611738565b1561161a576000816003015414156115c4576040517ff65a1d5f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8573ffffffffffffffffffffffffffffffffffffffff166108fc82600301549081150290604051600060405180830381858888f1935050505015801561160e573d6000803e3d6000fd5b50600081600301819055505b6116646040518060400160405280601b81526020017f70726f766964655472616e7366657245544820676173207573656400000000008152505a8561165f91906124d6565b6119c5565b505050505050565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6000806003811115611773577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b8260038111156117ac577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b14156117e4576040517f431e164800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6002600381111561181e577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b826003811115611857577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b141561188f576040517f88e8ca6500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6003808111156118c8577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b826003811115611901577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b1415611939576040517f044f6ac200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60016003811115611973577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b8260038111156119ac577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b14156119bb57600190506119c0565b600090505b919050565b611a5d82826040516024016119db9291906122b4565b6040516020818303038152906040527f9710a9d0000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050611a61565b5050565b60008151905060006a636f6e736f6c652e6c6f679050602083016000808483855afa5050505050565b6040518060c00160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff16815260200160006003811115611b09577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b815260200160006002811115611b48577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b815260200160008152602001600081525090565b828054611b68906125fa565b90600052602060002090601f016020900481019282611b8a5760008555611bd1565b82601f10611ba357803560ff1916838001178555611bd1565b82800160010185558215611bd1579182015b82811115611bd0578235825591602001919060010190611bb5565b5b509050611bde9190611be2565b5090565b5b80821115611bfb576000816000905550600101611be3565b5090565b6000611c12611c0d846123a8565b612383565b905082815260208101848484011115611c2a57600080fd5b611c358482856125b8565b509392505050565b600081359050611c4c8161284c565b92915050565b600081359050611c6181612863565b92915050565b60008083601f840112611c7957600080fd5b8235905067ffffffffffffffff811115611c9257600080fd5b602083019150836001820283011115611caa57600080fd5b9250929050565b60008083601f840112611cc357600080fd5b8235905067ffffffffffffffff811115611cdc57600080fd5b602083019150836001820283011115611cf457600080fd5b9250929050565b600082601f830112611d0c57600080fd5b8135611d1c848260208601611bff565b91505092915050565b600081359050611d348161287a565b92915050565b600060208284031215611d4c57600080fd5b6000611d5a84828501611c3d565b91505092915050565b600080600060408486031215611d7857600080fd5b6000611d8686828701611c52565b935050602084013567ffffffffffffffff811115611da357600080fd5b611daf86828701611c67565b92509250509250925092565b60008060208385031215611dce57600080fd5b600083013567ffffffffffffffff811115611de857600080fd5b611df485828601611c67565b92509250509250929050565b600080600060408486031215611e1557600080fd5b600084013567ffffffffffffffff811115611e2f57600080fd5b611e3b86828701611c67565b93509350506020611e4e86828701611d25565b9150509250925092565b60008060208385031215611e6b57600080fd5b600083013567ffffffffffffffff811115611e8557600080fd5b611e9185828601611cb1565b92509250509250929050565b600060208284031215611eaf57600080fd5b600082013567ffffffffffffffff811115611ec957600080fd5b611ed584828501611cfb565b91505092915050565b6000611eea83836120cb565b60c08301905092915050565b611eff8161250a565b82525050565b611f0e8161250a565b82525050565b6000611f1f826123e9565b611f298185612417565b9350611f34836123d9565b8060005b83811015611f65578151611f4c8882611ede565b9750611f578361240a565b925050600181019050611f38565b5085935050505092915050565b611f7b8161252e565b82525050565b611f8a8161253a565b82525050565b611fa1611f9c8261253a565b6126a6565b82525050565b6000611fb38385612428565b9350611fc08385846125b8565b82840190509392505050565b6000611fd7826123f4565b611fe18185612428565b9350611ff18185602086016125c7565b80840191505092915050565b61200681612594565b82525050565b612015816125a6565b82525050565b6000612026826123ff565b6120308185612433565b93506120408185602086016125c7565b6120498161279b565b840191505092915050565b600061205f826123ff565b6120698185612444565b93506120798185602086016125c7565b80840191505092915050565b6000612092602683612433565b915061209d826127ac565b604082019050919050565b60006120b5602083612433565b91506120c0826127fb565b602082019050919050565b60c0820160008201516120e16000850182611ef6565b5060208201516120f46020850182611ef6565b5060408201516121076040850182611ffd565b50606082015161211a606085018261200c565b50608082015161212d60808501826121c1565b5060a082015161214060a08501826121c1565b50505050565b60c08201600082015161215c6000850182611ef6565b50602082015161216f6020850182611ef6565b5060408201516121826040850182611ffd565b506060820151612195606085018261200c565b5060808201516121a860808501826121c1565b5060a08201516121bb60a08501826121c1565b50505050565b6121ca8161258a565b82525050565b6121d98161258a565b82525050565b60006121eb8284611f90565b60208201915081905092915050565b6000612207828486611fa7565b91508190509392505050565b600061221f8284611fcc565b915081905092915050565b60006122368284612054565b915081905092915050565b60006020820190506122566000830184611f05565b92915050565b600060208201905081810360008301526122768184611f14565b905092915050565b60006020820190506122936000830184611f72565b92915050565b60006020820190506122ae6000830184611f81565b92915050565b600060408201905081810360008301526122ce818561201b565b90506122dd60208301846121d0565b9392505050565b600060208201905081810360008301526122fd81612085565b9050919050565b6000602082019050818103600083015261231d816120a8565b9050919050565b600060c0820190506123396000830184612146565b92915050565b600060208201905061235460008301846121d0565b92915050565b600060408201905061236f60008301856121d0565b61237c60208301846121d0565b9392505050565b600061238d61239e565b9050612399828261262c565b919050565b6000604051905090565b600067ffffffffffffffff8211156123c3576123c261276c565b5b6123cc8261279b565b9050602081019050919050565b6000819050602082019050919050565b600081519050919050565b600081519050919050565b600081519050919050565b6000602082019050919050565b600082825260208201905092915050565b600081905092915050565b600082825260208201905092915050565b600081905092915050565b600061245a8261258a565b91506124658361258a565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561249a576124996126b0565b5b828201905092915050565b60006124b08261258a565b91506124bb8361258a565b9250826124cb576124ca6126df565b5b828204905092915050565b60006124e18261258a565b91506124ec8361258a565b9250828210156124ff576124fe6126b0565b5b828203905092915050565b60006125158261256a565b9050919050565b60006125278261256a565b9050919050565b60008115159050919050565b6000819050919050565b600081905061255282612824565b919050565b600081905061256582612838565b919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600061259f82612544565b9050919050565b60006125b182612557565b9050919050565b82818337600083830152505050565b60005b838110156125e55780820151818401526020810190506125ca565b838111156125f4576000848401525b50505050565b6000600282049050600182168061261257607f821691505b602082108114156126265761262561273d565b5b50919050565b6126358261279b565b810181811067ffffffffffffffff821117156126545761265361276c565b5b80604052505050565b60006126688261258a565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82141561269b5761269a6126b0565b5b600182019050919050565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b600481106128355761283461270e565b5b50565b600381106128495761284861270e565b5b50565b6128558161250a565b811461286057600080fd5b50565b61286c8161251c565b811461287757600080fd5b50565b6128838161258a565b811461288e57600080fd5b5056fea264697066735822122031245d95d05fc86a0c9216de3761a3f8afa2aa975c24d23ab77f46a3dcdace3064736f6c63430008040033";

type CryptoGiftsConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CryptoGiftsConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CryptoGifts__factory extends ContractFactory {
  constructor(...args: CryptoGiftsConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<CryptoGifts> {
    return super.deploy(overrides || {}) as Promise<CryptoGifts>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): CryptoGifts {
    return super.attach(address) as CryptoGifts;
  }
  connect(signer: Signer): CryptoGifts__factory {
    return super.connect(signer) as CryptoGifts__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CryptoGiftsInterface {
    return new utils.Interface(_abi) as CryptoGiftsInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CryptoGifts {
    return new Contract(address, _abi, signerOrProvider) as CryptoGifts;
  }
}
