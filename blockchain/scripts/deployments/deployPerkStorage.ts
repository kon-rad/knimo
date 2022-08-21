import { ethers } from "hardhat";
import { deployedContracts } from "../deployedContracts";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const hub = deployedContracts.hub;
  const PerkStorage = await ethers.getContractFactory("PerkStorage");
  const owner: string = process.env.OWNER as string;
  const perkStorage = await PerkStorage.deploy(owner, hub);

  await perkStorage.deployed();

  console.log(`Deployed PerkStorage to ${perkStorage.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
