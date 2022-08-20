// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.10;

import {FreeCollectModule} from './Lens/modules/collect/FreeCollectModule.sol';

contract CollectPerks is FreeCollectModule {
    constructor(address hub) FreeCollectModule(hub) {}
}