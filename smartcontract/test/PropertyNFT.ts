import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();

import { PropertyNFT } from "../types/ethers-contracts/PropertyNFT.js";

describe("PropertyNFT", function () {
  let propertyNFT: PropertyNFT;

  let owner: any;
  let seller: any;
  let buyer: any;

  const propertyAddress = "123 Blockchain Street";

  beforeEach(async () => {
    [owner, seller, buyer] = await ethers.getSigners();

    const ContractFactory = await ethers.getContractFactory("PropertyNFT");
    propertyNFT = await ContractFactory.deploy();
    await propertyNFT.waitForDeployment();
  });

  describe("Minting", function () {
    it("should mint a property NFT", async () => {
      await propertyNFT.mintProperty(seller.address, propertyAddress);

      expect(await propertyNFT.ownerOf(1)).to.equal(seller.address);

      const property = await propertyNFT.properties(1);
      expect(property.physicalAddress).to.equal(propertyAddress);
    });

    it("should prevent duplicate properties", async () => {
      await propertyNFT.mintProperty(seller.address, propertyAddress);

      await expect(
        propertyNFT.mintProperty(seller.address, propertyAddress)
      ).to.be.revertedWith("Property already exists");
    });
  });

  describe("Listing Property", function () {
    beforeEach(async () => {
      await propertyNFT.mintProperty(seller.address, propertyAddress);

      await propertyNFT
        .connect(seller)
        .approve(await propertyNFT.getAddress(), 1);
    });

    it("should list a property for sale", async () => {
      const price = ethers.parseEther("1");

      await propertyNFT.connect(seller).listProperty(1, price);

      const listing = await propertyNFT.listings(1);

      expect(listing.priceWei).to.equal(price);
      expect(listing.seller).to.equal(seller.address);
      expect(listing.isActive).to.equal(true);
    });

    it("should prevent non-owner from listing", async () => {
      const price = ethers.parseEther("1");

      await expect(
        propertyNFT.connect(buyer).listProperty(1, price)
      ).to.be.revertedWith("Not owner");
    });
  });

  describe("Update Listing", function () {
    beforeEach(async () => {
      await propertyNFT.mintProperty(seller.address, propertyAddress);

      await propertyNFT
        .connect(seller)
        .approve(await propertyNFT.getAddress(), 1);

      await propertyNFT
        .connect(seller)
        .listProperty(1, ethers.parseEther("1"));
    });

    it("should update listing price", async () => {
      const newPrice = ethers.parseEther("2");

      await propertyNFT.connect(seller).updateListing(1, newPrice);

      const listing = await propertyNFT.listings(1);
      expect(listing.priceWei).to.equal(newPrice);
    });
  });

  describe("Cancel Listing", function () {
    beforeEach(async () => {
      await propertyNFT.mintProperty(seller.address, propertyAddress);

      await propertyNFT
        .connect(seller)
        .approve(await propertyNFT.getAddress(), 1);

      await propertyNFT
        .connect(seller)
        .listProperty(1, ethers.parseEther("1"));
    });

    it("should cancel a listing", async () => {
      await propertyNFT.connect(seller).cancelListing(1);

      const listing = await propertyNFT.listings(1);
      expect(listing.isActive).to.equal(false);
    });
  });

  describe("Buying Property", function () {
    beforeEach(async () => {
      await propertyNFT.mintProperty(seller.address, propertyAddress);

      await propertyNFT
        .connect(seller)
        .approve(await propertyNFT.getAddress(), 1);

      await propertyNFT
        .connect(seller)
        .listProperty(1, ethers.parseEther("1"));
    });

    it("should transfer NFT and ETH when purchased", async () => {
      const price = ethers.parseEther("1");

      const sellerBalanceBefore = await ethers.provider.getBalance(
        seller.address
      );

      await propertyNFT.connect(buyer).buyProperty(1, { value: price });

      expect(await propertyNFT.ownerOf(1)).to.equal(buyer.address);

      const sellerBalanceAfter = await ethers.provider.getBalance(
        seller.address
      );

      expect(sellerBalanceAfter).to.be.gt(sellerBalanceBefore);
    });

    it("should reject incorrect payment", async () => {
      await expect(
        propertyNFT
          .connect(buyer)
          .buyProperty(1, { value: ethers.parseEther("0.5") })
      ).to.be.revertedWith("Incorrect payment");
    });
  });
});