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

contract CryptoGifts is Ownable {
  int256 public num;
  /// maps hash(hash(key)) to gift
  mapping(string => Gift) private gifts;

  function getRequiredGas() public pure returns (uint256) {
    // TODO: calculate required gas
    return .5 ether;
  }

  function putETH(string calldata _key, uint256 _amount) external payable {
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
    // emit GiftAdded(gift);

    payable(owner()).transfer(msg.value - _amount);

    // emit OwnerPaid

    console.log('gift created');
  }

  function has(string calldata _hashHashKey)
    external
    view
    returns (bool exists)
  {
    return gifts[_hashHashKey].exists;
  }

  function get(string calldata _hashHashkey)
    external
    view
    onlyOwner
    returns (Gift memory gift)
  {
    return gifts[_hashHashkey];
  }

  function bytes32ToString(bytes32 _bytes32)
    public
    pure
    returns (string memory)
  {
    uint8 i = 0;
    while (i < 32 && _bytes32[i] != 0) {
      i++;
    }
    bytes memory bytesArray = new bytes(i);
    for (i = 0; i < 32 && _bytes32[i] != 0; i++) {
      bytesArray[i] = _bytes32[i];
    }
    return string(bytesArray);
  }

  function hashString(string memory _key) public pure returns (bytes32) {
    return keccak256(abi.encodePacked(_key));
  }

  function hashStringToString(string memory _key)
    public
    view
    returns (string memory)
  {
    console.log('hash string to string');
    console.log('key', _key);
    string memory result = bytes32ToString((hashString(_key)));
    console.log('result', result);
    return result;
  }

  function hashBytes(bytes32 _key) public pure returns (bytes32) {
    return keccak256(abi.encodePacked(_key));
  }

  function hashHash(string calldata _key) public pure returns (bytes32) {
    return hashBytes((hashString(_key)));
  }

  function hashHashAlt(string calldata _key) public view returns (bytes32) {
    return hashString(hashStringToString(_key));
  }

  function provideTransferETH(address payable _receiver, bytes32 _hashKey)
    external
    onlyOwner
  {}

  function redeemGift(string calldata _key) external returns (Gift memory) {}
}
