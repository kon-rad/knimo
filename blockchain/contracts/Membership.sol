// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.5;

import {FeeFollowModule} from './modules/follow/FeeFollowModule.sol';
import {ModuleBase} from './modules/ModuleBase.sol';
import {FollowValidatorFollowModuleBase} from './modules/follow/FollowValidatorFollowModuleBase.sol';
import { ByteHasher } from './helpers/ByteHasher.sol';
import { IWorldID } from './interfaces/IWorldID.sol';
import {Errors} from './libraries/Errors.sol';
import {IERC20} from '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import {SafeERC20} from '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';
import {IERC721} from '@openzeppelin/contracts/token/ERC721/IERC721.sol';



contract MembershipManagement is FeeFollowModule {
    using ByteHasher for bytes;
    using SafeERC20 for IERC20;

    ///////////////////////////////////////////////////////////////////////////////
    ///                                  ERRORS                                ///
    //////////////////////////////////////////////////////////////////////////////

    /// @notice Thrown when attempting to reuse a nullifier
    error InvalidNullifier();

    /// @dev The WorldID instance that will be used for verifying proofs
    IWorldID internal immutable worldId;

    /// @dev The WorldID group ID (1)
    uint256 internal immutable groupId = 1;

    /// @dev Whether a nullifier hash has been used already. Used to prevent double-signaling
    mapping(uint256 => bool) internal nullifierHashes;

    /// @param _worldId The WorldID instance that will verify the proofs
    constructor(
        address hub, 
        address moduleGlobals,
        IWorldID _worldId
    )
        FeeFollowModule(hub, moduleGlobals)
    {
        worldId = _worldId;
    }

    function initializeFollowModule(uint256 profileId, bytes calldata data)
        external
        override
        onlyHub
        returns (bytes memory)
    {
        (uint256 amount, address currency, address recipient) = abi.decode(
            data,
            (uint256, address, address)
        );
        if (!_currencyWhitelisted(currency) || recipient == address(0) || amount == 0)
            revert Errors.InitParamsInvalid();

        _dataByProfile[profileId].amount = amount;
        _dataByProfile[profileId].currency = currency;
        _dataByProfile[profileId].recipient = recipient;
        return data;
    }
    
    function processFollow(
        address follower,
        uint256 profileId,
        bytes calldata data
    ) external override {
        (
            address input,
            uint256 root,
            uint256 nullifierHash,
            uint256[8] memory proof
        ) = abi.decode(data, (address, uint256, uint256, uint256[8]));
        
        verify(input, root, nullifierHash, proof);

        uint256 amount = _dataByProfile[profileId].amount;
        address currency = _dataByProfile[profileId].currency;
        // _validateDataIsExpected(data, currency, amount); need to fix this 

        (address treasury, uint16 treasuryFee) = _treasuryData();
        address recipient = _dataByProfile[profileId].recipient;
        uint256 treasuryAmount = (amount * treasuryFee) / BPS_MAX;
        uint256 adjustedAmount = amount - treasuryAmount;

        IERC20(currency).safeTransferFrom(follower, recipient, adjustedAmount);
        if (treasuryAmount > 0)
            IERC20(currency).safeTransferFrom(follower, treasury, treasuryAmount);
    }

    /// @param input User's input, used as the signal. Could be something else! (see README)
    /// @param root The of the Merkle tree, returned by the SDK.
    /// @param nullifierHash The nullifier for this proof, preventing double signaling, returned by the SDK.
    /// @param proof The zero knowledge proof that demostrates the claimer is registered with World ID, returned by the SDK.
    /// @dev Feel free to rename this method however you want! We've used `claim`, `verify` or `execute` in the past.
    function verify(
        address input,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] memory proof
    ) public {
        // first, we make sure this person hasn't done this before
        if (nullifierHashes[nullifierHash]) revert InvalidNullifier();

        // then, we verify they're registered with WorldID, and the input they've provided is correct
        worldId.verifyProof(
            root,
            groupId,
            abi.encodePacked(input).hashToField(),
            nullifierHash,
            abi.encodePacked(address(this)).hashToField(),
            proof
        );

        // finally, we record they've done this, so they can't do it again (proof of uniqueness)
        nullifierHashes[nullifierHash] = true;

        // your logic here, make sure to emit some kind of event afterwards!

    }
}