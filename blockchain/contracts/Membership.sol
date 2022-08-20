// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.5;

import {IFollowModule} from './interfaces/IFollowModule.sol';
import {ModuleBase} from './modules/ModuleBase.sol';
import {FollowValidatorFollowModuleBase} from './modules/follow/FollowValidatorFollowModuleBase.sol';
import { ByteHasher } from './helpers/ByteHasher.sol';
import { IWorldID } from './interfaces/IWorldID.sol';


contract Membership is IFollowModule {
    using ByteHasher for bytes;

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
    constructor(address hub, IWorldID _worldId) ModuleBase(hub) {
        worldId = _worldId;
    }

    function initializeFollowModule(uint256 profileId, bytes calldata data)
        external
        override
        onlyHub
        returns (bytes memory)
    {}

    function processFollow(
        address follower,
        uint256 profileId,
        bytes calldata data
    ) external override {

        (
            address input,
            uint256 root,
            uint256 nullifierHash,
            uint256[8] calldata proof
        ) = abi.decode(data, (address, uint256, uint256, uint256[8]));
        
        verifyAndExecute(input, root, nullifierHash, proof);

        // add custom logic
    }

    function followModuleTransferHook(
        uint256 profileId,
        address from,
        address to,
        uint256 followNFTTokenId
    ) external override {}

    /// @param input User's input, used as the signal. Could be something else! (see README)
    /// @param root The of the Merkle tree, returned by the SDK.
    /// @param nullifierHash The nullifier for this proof, preventing double signaling, returned by the SDK.
    /// @param proof The zero knowledge proof that demostrates the claimer is registered with World ID, returned by the SDK.
    /// @dev Feel free to rename this method however you want! We've used `claim`, `verify` or `execute` in the past.
    function verifyAndExecute(
        address input,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof
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