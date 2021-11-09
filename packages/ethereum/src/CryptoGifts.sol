//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/access/Ownable.sol';
import 'hardhat/console.sol';

enum GiftType {
  ETH,
  ERC20,
  ERC721
}

enum GiftStatus {
  NONE,
  PENDING,
  REDEEMED,
  REVOKED
}

struct Gift {
  address sender;
  address redeemer;
  GiftStatus status;
  GiftType giftType;
  uint256 giftValue;
  uint256 giftGas;
  // bool notifySender;
}

interface ICryptoGifts {
  function putETH(string calldata _key, uint256 _giftValue) external payable;

  function get(string calldata _key) external returns (Gift memory gift);

  // function redeem(string calldata _key) external;
}

// interface IGiftGasAssistant {
//   function requestGas(string calldata _key) external;

//   function addGas(string calldata _kay) external payable;
// }

contract CryptoGifts is Ownable {
  int256 public num;
  /// maps hash(hash(key)) to gift
  mapping(bytes => Gift) private gifts;
  mapping(address => bytes[]) private giftsBySender;

  function getMyGifts() external view returns (Gift[] memory) {
    bytes[] memory keys = giftsBySender[msg.sender];

    Gift[] memory myGifts = new Gift[](keys.length);
    for (uint256 i = 0; i < keys.length; i++) {
      myGifts[i] = gifts[keys[i]];
    }

    return myGifts;
  }

  function getRequiredGas() public pure returns (uint256) {
    // TODO: calculate required gas
    return .5 ether;
  }

  error ValueMustBeGreaterThanZero();
  error AmountMustBeGreaterThanZero();
  error ValueMustBeGreaterThanAmount();
  error NotEnoughGiftGas(uint256 provided, uint256 required);

  function putETH(bytes calldata _hashHashKey, uint256 _giftValue)
    external
    payable
  {
    if (msg.value == 0) {
      revert ValueMustBeGreaterThanZero();
    }
    if (_giftValue == 0) {
      revert AmountMustBeGreaterThanZero();
    }
    if (msg.value <= _giftValue) {
      revert ValueMustBeGreaterThanAmount();
    }

    uint256 requiredGas = getRequiredGas();

    if (msg.value < _giftValue + requiredGas) {
      revert NotEnoughGiftGas(msg.value - _giftValue, requiredGas);
    }

    // Split the extra value in two
    uint256 giftGas = (msg.value - _giftValue) / 2;

    // One half goes to EOA providing gas to the redeemer
    payable(owner()).transfer(giftGas);

    // The other half stays in the contract
    Gift memory gift = Gift({
      sender: msg.sender,
      redeemer: address(0),
      giftType: GiftType.ETH,
      giftValue: _giftValue,
      giftGas: giftGas,
      status: GiftStatus.PENDING
    });

    gifts[_hashHashKey] = gift;
    giftsBySender[msg.sender].push(_hashHashKey);

    // emit GiftAdded(gift);

    // emit OwnerPaid
  }

  function has(bytes calldata _hashHashKey)
    external
    view
    onlyOwner
    returns (bool exists)
  {
    return gifts[_hashHashKey].status != GiftStatus.NONE;
  }

  function get(bytes calldata _hashHashKey)
    external
    view
    onlyOwner
    returns (Gift memory gift)
  {
    return gifts[_hashHashKey];
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

  error WrongKey();
  error GiftAlreadyRedeemed();
  error GiftAlreadyRevoked();

  function isGiftPending(GiftStatus _status) internal pure returns (bool) {
    if (_status == GiftStatus.NONE) {
      revert WrongKey();
    }

    if (_status == GiftStatus.REDEEMED) {
      revert GiftAlreadyRedeemed();
    }

    if (_status == GiftStatus.REVOKED) {
      revert GiftAlreadyRevoked();
    }

    if (_status == GiftStatus.PENDING) {
      return true;
    }

    return false;
  }

  error NoGiftGas();

  function provideTransferETH(
    address payable _receiver,
    bytes calldata _hashKey
  ) external onlyOwner {
    bytes memory hashHashKey = abi.encodePacked(hashBytes(_hashKey));

    Gift storage gift = gifts[hashHashKey];

    if (isGiftPending(gift.status)) {
      if (gift.giftGas == 0) {
        revert NoGiftGas();
      }
      _receiver.transfer(gift.giftGas);

      gift.giftGas = 0;
    }
  }

  function redeemGift(string calldata _key) external {
    bytes memory hashHashKey = abi.encodePacked(hashHash(_key));

    Gift storage gift = gifts[hashHashKey];

    if (isGiftPending(gift.status)) {
      gift.status = GiftStatus.REDEEMED;
      gift.redeemer = msg.sender;
      payable(msg.sender).transfer(gift.giftValue);
    }
  }
}
