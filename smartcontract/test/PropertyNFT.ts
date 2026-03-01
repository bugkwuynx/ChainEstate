import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();

import { PropertyNFT } from "../types/ethers-contracts/PropertyNFT.js";

describe("PropertyNFT", function () {
    let propertyNFT: PropertyNFT;
    let owner: any;
    let user: any;
    let other: any;

    const physicalAddress = "123 Main St, Anytown, USA";
    const tokenURI = "ipfs://QmY...";

    this.beforeEach(async function() {
        [owner, user, other] = await ethers.getSigners();

        const PropertyNFTFactory = await ethers.getContractFactory("PropertyNFT");
        propertyNFT = (await PropertyNFTFactory.deploy()) as PropertyNFT;

        await propertyNFT.waitForDeployment();
    });

    describe("Deployment", function() {
        it("Should set the correct name and symbol", async () => {
            expect(await propertyNFT.name()).to.equal("PropertyNFT");
            expect(await propertyNFT.symbol()).to.equal("PROP");
        });

        it ("Should set deployer as contract owner", async () => {
            expect(await propertyNFT.owner()).to.equal(owner.address);
        });
    });

    describe("Minting", () => {
        it("Should mint a property NFT sucessfully", async () => {
            const tx = await propertyNFT
                .connect(owner)
                .mintProperty(user.address, physicalAddress, tokenURI);

            const receipt = await tx.wait();

            const tokenId = 1;

            expect(await propertyNFT.ownerOf(tokenId)).to.equal(user.address);
            expect(await propertyNFT.tokenURI(tokenId)).to.equal(tokenURI);

            const property = await propertyNFT.properties(tokenId);
            expect(property.physicalAddress).to.equal(physicalAddress);
            expect(property.tokenId).to.equal(tokenId);
            expect(property.owner).to.equal(user.address);
        });

        it("Should emit PropertyMinted event", async function () {
            await expect(
                propertyNFT
                .connect(owner)
                .mintProperty(user.address, physicalAddress, tokenURI)
            )
                .to.emit(propertyNFT, "PropertyMinted")
                .withArgs(1, user.address, physicalAddress);
        });
      
        it("Should revert if not called by owner", async function () {
        await expect(
            propertyNFT
            .connect(user)
            .mintProperty(user.address, physicalAddress, tokenURI)
        ).to.be.revertedWithCustomError(propertyNFT, "OwnableUnauthorizedAccount");
        });
    
        it("Should revert for zero address owner", async function () {
        await expect(
            propertyNFT
            .connect(owner)
            .mintProperty(ethers.ZeroAddress, physicalAddress, tokenURI)
        ).to.be.revertedWith("Invalid owner address");
        });
    
        it("Should revert if physical address is empty", async function () {
        await expect(
            propertyNFT
            .connect(owner)
            .mintProperty(user.address, "", tokenURI)
        ).to.be.revertedWith("Physical address is required");
        });
    
        it("Should revert if token URI is empty", async function () {
        await expect(
            propertyNFT
            .connect(owner)
            .mintProperty(user.address, physicalAddress, "")
        ).to.be.revertedWith("Token URI is required");
        });
    
        it("Should prevent duplicate property minting", async function () {
        await propertyNFT
            .connect(owner)
            .mintProperty(user.address, physicalAddress, tokenURI);
    
        await expect(
            propertyNFT
            .connect(owner)
            .mintProperty(other.address, physicalAddress, tokenURI)
        ).to.be.revertedWith("Property already exists");
        });
    });
});