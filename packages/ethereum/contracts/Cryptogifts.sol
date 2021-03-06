//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.7;

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
  REDEEMED
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

contract Cryptogifts is Ownable {
  mapping(bytes => Gift) private gifts;
  mapping(address => bytes[]) private giftsBySender;
  uint256 constant GAS_FOR_GIFT_REDEEM = 100000;
  uint256 constant GAS_FOR_FEE_REDEEM = 100000;

  function getMyGifts() external view returns (Gift[] memory) {
    bytes[] memory keys = giftsBySender[msg.sender];

    Gift[] memory myGifts = new Gift[](keys.length);
    for (uint256 i = 0; i < keys.length; i++) {
      myGifts[i] = gifts[keys[i]];
    }

    return myGifts;
  }

  function getRequiredGas() public pure returns (uint256) {
    return GAS_FOR_FEE_REDEEM + GAS_FOR_GIFT_REDEEM;
  }

  function getGasRequiredForRedeem() public pure returns (uint256) {
    return GAS_FOR_GIFT_REDEEM;
  }

  error ValueMustBeGreaterThanZero();
  error AmountMustBeGreaterThanZero();
  error ValueMustBeGreaterThanAmount();

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

    // Split the extra value in two
    uint256 giftGas = (msg.value - _giftValue) / 2;

    console.log('giftGas', giftGas);

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
    returns (Gift memory gift)
  {
    return gifts[_hashHashKey];
  }

  function getGiftGasValue(bytes calldata _hashHashKey)
    external
    view
    onlyOwner
    returns (uint256)
  {
    return gifts[_hashHashKey].giftGas;
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

    if (_status == GiftStatus.PENDING) {
      return true;
    }

    return false;
  }

  error NoGiftGas();

  function provideTransferFee(
    address payable _receiver,
    bytes calldata _hashKey
  ) external onlyOwner {
    uint256 u0 = gasleft();

    bytes memory hashHashKey = abi.encodePacked(hashBytes(_hashKey));

    Gift storage gift = gifts[hashHashKey];

    if (isGiftPending(gift.status)) {
      if (gift.giftGas == 0) {
        revert NoGiftGas();
      }
      _receiver.transfer(gift.giftGas);

      gift.giftGas = 0;
    }

    console.log('provideTransferETH gas used', u0 - gasleft());
  }

  function redeemGift(string calldata _key) external {
    bytes memory hashHashKey = abi.encodePacked(hashHash(_key));

    Gift storage gift = gifts[hashHashKey];

    if (isGiftPending(gift.status)) {
      gift.status = GiftStatus.REDEEMED;
      gift.redeemer = msg.sender;
      payable(msg.sender).transfer(gift.giftValue);

      // if gift redeemed but transferFee wasn not requested
      if (gift.giftGas > 0) {
        payable(gift.sender).transfer(gift.giftGas);
      }
    }
  }
}
