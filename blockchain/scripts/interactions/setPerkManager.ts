import { ethers } from "hardhat";
import { deployedContracts } from "../deployedContracts";
import { BytesLike } from "ethers/lib/utils";
import * as dotenv from "dotenv";
dotenv.config();

export const setPerkManager = async () => {
    const NODE_URL = `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_API}`
    const provider = new ethers.providers.JsonRpcProvider(NODE_URL)
    const PRIVATE_KEY = process.env.PRIVATE_KEY

    const signer = new ethers.Wallet(PRIVATE_KEY as BytesLike)
    const account = signer.connect(provider)

    const _interface = new ethers.utils.Interface([
      "function setPerkManager(address _perkManager) external",
    ])

    const PerkStorage =  deployedContracts.perkStorage

    const PerksContract = new ethers.Contract(
        PerkStorage,
        _interface,
        account
    )

    const PerkManager = deployedContracts.collectPerksModule

    const tx = await PerksContract.setPerkManager(
        PerkManager,
        {
            gasLimit: 100000,
            gasPrice: 80000000000,
            nonce: 196
        }
    )

    console.log(`Transaction hash: ${tx.hash}`)

    const receipt = await tx.wait()

    console.log(`Transaction was mined in block ${receipt.blockNumber}`)
}

setPerkManager()
  .then(() => process.exit(0))
  .catch(error => {
  console.error(error)
  process.exit(1)
})

