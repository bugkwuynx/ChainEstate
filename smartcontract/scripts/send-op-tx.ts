import { network } from "hardhat";

const { ethers } = await network.connect({
  network: "hardhatOp",
  chainType: "op",
});

async function main() {
  console.log("Deploying PropertyNFT to OP network...");

  const PropertyNFT = await ethers.getContractFactory("PropertyNFT");
  const propertyNFT = await PropertyNFT.deploy();

  await propertyNFT.waitForDeployment();

  console.log("PropertyNFT deployed to:", await propertyNFT.getAddress());
}

await main();