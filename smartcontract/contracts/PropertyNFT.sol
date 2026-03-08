// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract PropertyNFT is ERC721URIStorage, Ownable, ReentrancyGuard {
    uint256 private _nextTokenId = 1;

    mapping(bytes32 => bool) public propertyExists;

    struct PropertyData {
        string physicalAddress;
        uint256 tokenId;
    }

    struct Listing {
        address seller;
        uint256 priceWei;
        bool isActive;
    }

    mapping(uint256 => Listing) public listings;

    mapping(uint256 => PropertyData) public properties;

    event PropertyMinted(
        uint256 indexed tokenId,
        address indexed owner,
        string physicalAddress
    );

    event PropertyTransferred(
        uint256 indexed tokenId,
        address indexed from,
        address indexed to
    );

    event PropertyListed(
        uint256 indexed tokenId,
        address indexed seller,
        uint256 priceWei
    );

    event PropertySaleCancelled(uint256 indexed tokenId);

    event PropertyPriceUpdated(uint256 indexed tokenId, uint256 newPrice);

    constructor() ERC721("PropertyNFT", "PROP") Ownable(msg.sender) {}

    /**
        Mint a new property NFT
     */
    function mintProperty(
        address owner,
        string memory physicalAddress
    ) public onlyOwner returns (uint256) {
        require(owner != address(0), "Invalid owner address");
        require(
            bytes(physicalAddress).length > 0,
            "Physical address is required"
        );

        // Hash the physical address to prevent duplicate tokenization
        bytes32 propertyHash = keccak256(abi.encodePacked(physicalAddress));
        require(!propertyExists[propertyHash], "Property already exists");

        uint256 newTokenId = _nextTokenId;
        _nextTokenId++;

        _safeMint(owner, newTokenId);

        propertyExists[propertyHash] = true;

        properties[newTokenId] = PropertyData({
            physicalAddress: physicalAddress,
            tokenId: newTokenId
        });

        emit PropertyMinted(newTokenId, owner, physicalAddress);

        return newTokenId;
    }

    /**
        List property for sale
     */
    function listProperty(uint256 tokenId, uint256 priceWei) public {
        require(_ownerOf(tokenId) == msg.sender, "Not owner");
        require(priceWei > 0, "Price must be greater than 0");

        require(
            getApproved(tokenId) == address(this) ||
                isApprovedForAll(msg.sender, address(this)),
            "Marketplace not approved"
        );

        listings[tokenId] = Listing({
            seller: msg.sender,
            priceWei: priceWei,
            isActive: true
        });

        emit PropertyListed(tokenId, msg.sender, priceWei);
    }

    /**
        Cancel property listing
     */
    function cancelListing(uint256 tokenId) public {
        Listing storage listing = listings[tokenId];

        require(listing.seller == msg.sender, "Not seller");
        require(listing.isActive, "Listing not active");

        listing.isActive = false;

        emit PropertySaleCancelled(tokenId);
    }

    /**
        Update listing price
     */
    function updateListing(uint256 tokenId, uint256 newPrice) public {
        Listing storage listing = listings[tokenId];

        require(listing.seller == msg.sender, "Not seller");
        require(listing.isActive, "Listing not active");
        require(newPrice > 0, "Invalid price");

        listing.priceWei = newPrice;

        emit PropertyPriceUpdated(tokenId, newPrice);
    }

    /**
        Buy property
     */
    function buyProperty(uint256 tokenId) public payable nonReentrant {
        Listing storage listing = listings[tokenId];

        require(listing.isActive, "Property not for sale");
        require(msg.value == listing.priceWei, "Incorrect payment");

        address seller = listing.seller;
        address buyer = msg.sender;

        require(buyer != seller, "Seller cannot buy their own property");
        require(ownerOf(tokenId) == seller, "Seller no longer owns property");

        // Transfer NFT
        _transfer(seller, buyer, tokenId);

        // Transfer ETH to seller
        (bool success, ) = seller.call{value: msg.value}("");
        require(success, "ETH transfer failed");

        listings[tokenId].isActive = false;

        emit PropertyTransferred(tokenId, seller, buyer);
    }
}
