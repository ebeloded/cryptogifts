//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import 'hardhat/console.sol';

contract Greeter {
  string private greeting;

  constructor(string memory _greeting) {
    console.log('Deploying a Greeter with greeting:', _greeting);
    greeting = _greeting;
  }


  function greet() public view returns (string memory) {
    console.log("greet2", greeting);
    return greeting;
  }

  /**
    setGreeting
   */
  function setGreeting(string memory _greeting) public {
    console.log("Changing greeting x from '%s' to '%s'", greeting, _greeting);
    greeting = _greeting;
  }

  // getMyAddress function
  function getMyAddress() public view returns (address) {
    return msg.sender;
  }

}
