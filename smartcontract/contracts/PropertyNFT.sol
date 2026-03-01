// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PropertyNFT is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId = 1;

    mapping(bytes32 => bool) public propertyExists;

    struct PropertyData {
        string physicalAddress;
        uint256 tokenId;
        address owner;
    }

    mapping(uint256 => PropertyData) public properties;

    event PropertyMinted(
        uint256 indexed tokenId,
        address indexed owner,
        string physicalAddress
    );

    constructor() ERC721("PropertyNFT", "PROP") Ownable(msg.sender) {}

    /**
        Mint a new property NFT
        - owner: wallet receiving NFT
        - physicalAddress: real-world address (hashed to prevent duplicates)
        - tokenURI: IPFS metadata link
     */
     function mintProperty(
        address owner,
        string memory physicalAddress,
        string memory tokenURI
     ) public onlyOwner returns (uint256) {
        require(owner != address(0), "Invalid owner address");
        require(bytes(physicalAddress).length > 0, "Physical address is required");
        require(bytes(tokenURI).length > 0, "Token URI is required");

        // Hash the physical address to prevent duplicate tokenization
        bytes32 propertyHash = keccak256(abi.encodePacked(physicalAddress));
        require(!propertyExists[propertyHash], "Property already exists");

        uint256 newTokenId = _nextTokenId;
        _nextTokenId++;

        _safeMint(owner, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        propertyExists[propertyHash] = true;

        properties[newTokenId] = PropertyData({
            physicalAddress: physicalAddress,
            tokenId: newTokenId,
            owner: owner
        });

        emit PropertyMinted(newTokenId, owner, physicalAddress);
        
        return newTokenId;
     }
}