// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.10;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract PerkStorage is Ownable {
    mapping(address => mapping(uint256 => uint256[])) internal _perksAccrued;
    address public perkManager; 

    error NotPerkManager();
        
    constructor(address _owner)Ownable(){_transferOwnership(_owner);}

    function storePerks(address followNFTAddress, uint256 followId, uint256 pubId) external {
        if(msg.sender != perkManager) revert NotPerkManager();
        _perksAccrued[followNFTAddress][followId].push(pubId);
    }

    function viewPerks(address followNFTAddress, uint256 followId) external view returns (uint256[] memory){
        return _perksAccrued[followNFTAddress][followId];
    }

    function setPerkManager(address _perkManager) onlyOwner external {
        perkManager = _perkManager;
    }
}