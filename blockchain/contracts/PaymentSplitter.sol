// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/finance/PaymentSplitter.sol";

contract KnimoPaymentSplitter is PaymentSplitter {
    constructor(
        address[] memory payees, 
        uint256[] memory shares_
    ) PaymentSplitter(payees, shares_) payable {}

    function releaseFunds(address payable account) external {
        super.release(account);
    }

    function totalFundsReleased() external view returns (uint256){
        return totalReleased();
    }
}