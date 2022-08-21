import { ethers } from "hardhat";
import { deployedContracts } from "../deployedContracts";
import { BytesLike } from "ethers/lib/utils";
import * as dotenv from "dotenv";
dotenv.config();

export const CollectPerks = async (profileId: Number, pubId: Number, data: BytesLike) => {
    const NODE_URL = `https://alchemy.api/${process.env.ALCHEMY_API}` // - change to proper alchemy http
    const provider = new ethers.providers.JsonRpcProvider(NODE_URL)
    const PRIVATE_KEY = process.env.PRIVATE_KEY

    const signer = new ethers.Wallet(PRIVATE_KEY as BytesLike)
    const account = signer.connect(provider)

    const _interface = new ethers.utils.Interface([
      "function collectPerks(uint256 profileId,uint256 pubId, bytes calldata data) external",
      "function viewPerks(address followNFTAddress, uint256 followId) external view returns (uint256[] memory)"
    ])

    const PerkStorage =  deployedContracts.perkStorage

    const PerksContract = new ethers.Contract(
        PerkStorage,
        _interface,
        account
    )

    const tx = await PerksContract.collectPerks(
        profileId,
        pubId,
        data,
        {
            gasLimit: 2500000
        }
    )

    console.log(`Transaction hash: ${tx.hash}`)

    const receipt = await tx.wait()

    console.log(`Transaction was mined in block ${receipt.blockNumber}`)
}

