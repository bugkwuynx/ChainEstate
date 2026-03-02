import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const PropertyNFTModule = buildModule("PropertyNFTModule", (m) => {

  const propertyNFT = m.contract("PropertyNFT", []);

  return { propertyNFT };
});

export default PropertyNFTModule;