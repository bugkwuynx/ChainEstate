import { network } from "hardhat";

async function main() {
  const { ethers } = await network.connect();

  const PropertyNFT = await ethers.getContractFactory("PropertyNFT");
  const propertyNFT = await PropertyNFT.deploy();

  await propertyNFT.waitForDeployment();

  console.log("Deployed to:", await propertyNFT.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});