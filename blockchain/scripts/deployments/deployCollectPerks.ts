import { ethers } from "hardhat";
import { deployedContracts } from "../deployedContracts";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const hub = deployedContracts.hub;
  const CollectPerks = await ethers.getContractFactory("CollectPerks");
  const collectPerks = await CollectPerks.deploy(hub);

  await collectPerks.deployed();

  console.log(`Deployed CollectPerks to ${collectPerks.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
