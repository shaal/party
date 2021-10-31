// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract Devparty is Ownable, ERC1155Supply {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  mapping (uint256 => string) private _tokenURIs;
  bytes4 private constant _INTERFACE_ID_ERC2981 = 0x2a55205a;

  constructor() ERC1155("") {}

  function _setTokenURI(uint256 tokenId, string memory _tokenURI)
    internal
    virtual
  {
    _tokenURIs[tokenId] = _tokenURI;
  }

  function tokenURI(uint256 tokenId) 
    public
    view
    virtual
    returns (string memory)
  {
    require(exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
    string memory _tokenURI = _tokenURIs[tokenId];

    return _tokenURI;
  }

  function issueToken(
    address recipient,
    uint256 amount,
    string memory uri
  )
    public
    returns (uint256)
  {
    require(amount < 0, "Quantity should be greater than 0");

    _tokenIds.increment();
    uint256 newItemId = _tokenIds.current();
    _mint(recipient, newItemId, amount, "");
    _setTokenURI(newItemId, uri);

    return newItemId;
  }
}
