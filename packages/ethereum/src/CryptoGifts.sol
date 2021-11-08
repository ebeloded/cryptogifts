//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/access/Ownable.sol';
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

error ValueMustBeGreaterThanZero();
error AmountMustBeGreaterThanZero();
error ValueMustBeGreaterThanAmount();
error NotEnoughEthForExtraGas(uint256 provided, uint256 required);
error WrongKey();

contract CryptoGifts is Ownable {
  int256 public num;
  /// maps hash(hash(key)) to gift
  mapping(bytes => Gift) private giftsByHash;

  function getRequiredGas() public pure returns (uint256) {
    // TODO: calculate required gas
    return .5 ether;
  }

  function putETH(bytes calldata _hashHashKey, uint256 _amount)
    external
    payable
  {
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

    giftsByHash[_hashHashKey] = gift;
    // emit GiftAdded(gift);

    payable(owner()).transfer(msg.value - _amount);

    // emit OwnerPaid

    console.log('gift created');
  }

  function has(bytes calldata _hashHashKey)
    external
    view
    onlyOwner
    returns (bool exists)
  {
    return giftsByHash[_hashHashKey].exists;
  }

  function get(bytes calldata _hashHashKey)
    external
    view
    onlyOwner
    returns (Gift memory gift)
  {
    return giftsByHash[_hashHashKey];
  }

  function hashString(string memory _key) public pure returns (bytes32) {
    return keccak256(abi.encodePacked(_key));
  }

  function hashBytes(bytes calldata _key) public pure returns (bytes32) {
    return keccak256(abi.encodePacked(_key));
  }

  function hashHash(string calldata _key) public pure returns (bytes32) {
    return keccak256(abi.encodePacked(((hashString(_key)))));
  }

  function provideTransferETH(
    address payable _receiver,
    bytes calldata _hashKey
  ) external onlyOwner {
    console.log('ProvideTransferETH', _receiver);
  }

  function redeemGift(string calldata _key) external {
    bytes memory hashHashKey = abi.encodePacked(hashHash(_key));
    Gift memory gift = giftsByHash[hashHashKey];

    if (giftsByHash[hashHashKey].exists == false) {
      revert WrongKey();
    }

    payable(msg.sender).transfer(gift.amount);

    delete giftsByHash[hashHashKey];
  }
}
