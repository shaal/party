// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@opengsn/contracts/src/BaseRelayRecipient.sol";

contract Devparty is Ownable, ERC1155Supply, BaseRelayRecipient {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  mapping (uint256 => string) private _tokenURIs;

  constructor() ERC1155("") {}

  function contractURI() pure public returns (string memory) {
    return "https://ipfs.infura.io/ipfs/Qmc4Dxmk1vPoF5xRdVfM6pwv7Lo6RHY8GBmHWKQXNKsQdY";
  }

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
    require(exists(tokenId), "URI query for nonexistent token");
    string memory _tokenURI = _tokenURIs[tokenId];

    return _tokenURI;
  }

  /**
    * Mint + Issue Token
    *
    * @param recipient - Token will be issued to recipient
    * @param amount - amount of tokens to mint
    * @param uri - IPFS URL
    */
  function issueToken(
    address recipient,
    uint256 amount,
    string memory uri
  )
    public
    returns (uint256)
  {
    require(amount != 0, "Quantity should be positive");

    _tokenIds.increment();
    uint256 newItemId = _tokenIds.current();
    _mint(recipient, newItemId, amount, "");
    _setTokenURI(newItemId, uri);

    return newItemId;
  }

  function _msgSender()
    internal
    view
    override(Context, BaseRelayRecipient)
    returns (address)
  {
    return BaseRelayRecipient._msgSender();
  }

  function _msgData()
    internal
    view
    override(Context, BaseRelayRecipient)
    returns (bytes memory)
  {
    return BaseRelayRecipient._msgData();
  }

  function versionRecipient()
    external
    virtual
    override
    view
    returns (string memory)
  {
    return "1";
  }
}
