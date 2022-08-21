import { ethers } from "hardhat";
import { deployedContracts } from "../deployedContracts";

async function main() {
  const hub = deployedContracts.hub;

  const Membership = await ethers.getContractFactory("GetMembership");
  const membership = await Membership.deploy(hub);

  await membership.deployed();

  console.log(`Deployed Membership Module to ${membership.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
