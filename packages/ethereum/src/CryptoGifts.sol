//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import 'hardhat/console.sol';

enum GiftType {
  ETH,
  ERC20,
  ERC721
}

struct Gift {
  address from;
  bool notify;
  GiftType giftType;
  uint256 amount;
  uint256 gasLimit;
  bool exists;
}

interface ICryptoGifts {
  function putETH(string calldata _key, uint256 _amount) external payable;

  function get(string calldata _key) external returns (Gift memory gift);

  // function redeem(string calldata _key) external;
}

// interface IGiftGasAssistant {
//   function requestGas(string calldata _key) external;

//   function addGas(string calldata _kay) external payable;
// }

contract CryptoGifts {
  error ValueMustBeGreaterThanZero();
  error AmountMustBeGreaterThanZero();
  error ValueMustBeGreaterThanAmount();
  error NotEnoughEthForExtraGas(uint256 provided, uint256 required);

  int256 public num;
  /// maps hash(hash(key)) to gift
  mapping(string => Gift) private gifts;

  function getRequiredGas() public pure returns (uint256) {
    // TODO: calculate required gas
    return 100 wei;
  }

  function getWei() external view returns (uint256) {
    console.log('wei', 1 wei);
    return 1 wei;
  }

  function getEth() external view returns (uint256) {
    console.log('ether', 1 ether);
    return 1 ether;
  }

  function putETH(string calldata _key, uint256 _amount) external payable {
    console.log('key', _key);
    console.log('amount', _amount);
    console.log('value', msg.value);
    console.log('sender', msg.sender);

    if (msg.value == 0) {
      revert ValueMustBeGreaterThanZero();
    }
    if (_amount == 0) {
      revert AmountMustBeGreaterThanZero();
    }
    if (msg.value <= _amount) {
      revert ValueMustBeGreaterThanAmount();
    }

    uint256 requiredGas = getRequiredGas();

    if (msg.value - _amount < requiredGas) {
      revert NotEnoughEthForExtraGas(msg.value - _amount, requiredGas);
    }

    Gift memory gift = Gift({
      from: msg.sender,
      notify: false,
      giftType: GiftType.ETH,
      amount: _amount,
      gasLimit: msg.value - _amount,
      exists: true
    });

    gifts[_key] = gift;

    console.log('gift created');
  }

  function has(string calldata _key) external view returns (bool exists) {
    return gifts[_key].exists;
  }

  // function redeem()
}
