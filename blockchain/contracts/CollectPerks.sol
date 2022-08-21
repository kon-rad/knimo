// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.10;

import {ICollectModule} from './Lens/interfaces/ICollectModule.sol';
import {ModuleBase} from './Lens/modules/ModuleBase.sol';
import {FollowValidationModuleBase} from './Lens/modules/FollowValidationModuleBase.sol';


interface Perks {
    function storePerks(address followNFTAddress, uint256 followId, uint256 pubId) external;
}

contract CollectPerks is ModuleBase, ICollectModule {

    Perks public perkStorage;
    error NotPerkStorage();

    constructor(address hub) ModuleBase(hub){}
    
    function initializePublicationCollectModule(
        uint256 profileId,
        uint256 pubId,
        bytes calldata data
    ) external returns (bytes memory){
        address _perkStorage = abi.decode(data,(address));
        perkStorage = Perks(_perkStorage);
    }

    /**
     * @notice Processes a collect action for a given publication, this can only be called by the hub.
     *
     * @param referrerProfileId The LensHub profile token ID of the referrer's profile (only different in case of mirrors).
     * @param collector The collector address.
     * @param profileId The token ID of the profile associated with the publication being collected.
     * @param pubId The LensHub publication ID associated with the publication being collected.
     * @param data Arbitrary data __passed from the collector!__ to be decoded.
     */
    function processCollect(
        uint256 referrerProfileId,
        address collector,
        uint256 profileId,
        uint256 pubId,
        bytes calldata data
    ) external{
        if(collector != address(perkStorage)) revert NotPerkStorage();
        (address followNFTAddress, uint256 followId) = abi.decode(data,(address, uint256));
        perkStorage.storePerks(followNFTAddress, followId, pubId);
    }
}