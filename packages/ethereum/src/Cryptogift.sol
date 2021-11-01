//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import 'hardhat/console.sol';

enum GiftType {
  Eth,
  ERC20,
  ERC721
}

contract Cryptogift {
  mapping(string => uint256) public giftMap;

  function stashETH(string memory key, uint256 amount) public payable {
    console.log('key', key);
    console.log('amount', amount);
    console.log('value', msg.value);
    console.log('sender', msg.sender);
    if (giftMap[key] != 0) {
      revert('Key already exists');
    }

    giftMap[key] = amount;
  }

  function get(string memory key) public view returns (uint256) {
    console.log('key', key);
    return giftMap[key];
  }

  function unstash(
    address recipient,
    string memory key,
    GiftType kind
  ) public {
    console.log('key', key);
    // console.log('kind', kind);
    console.log('recipient', recipient);
    console.log('sender', msg.sender);
  }
}
