// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.10;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC721Receiver} from "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

interface IHub {
    function collect(
        uint256 profileId,
        uint256 pubId,
        bytes calldata data
    ) external returns (uint256);
}

contract PerkStorage is IERC721Receiver, Ownable {
    mapping(address => mapping(uint256 => uint256[])) internal _perksAccrued;
    address public perkManager;
    IHub immutable public HUB; 

    error NotPerkManager();
        
    constructor(address _owner, address hub)Ownable(){
        _transferOwnership(_owner);
        HUB = IHub(hub);
    }

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

    function collectPerks(
        uint256 profileId,
        uint256 pubId,
        bytes calldata data
    ) external onlyOwner {
        HUB.collect(profileId, pubId, data);
    }

    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external returns (bytes4){
        return IERC721Receiver.onERC721Received.selector;
    }
}