pragma solidity ^0.5.2;

contract IPFSStorage {
  struct Multihash {
    bytes32 digest;
    uint8 hashFunction;
    uint8 size;
  }

  mapping (address => Multihash) private entries;

  event EntrySet (
    address indexed key,
    bytes32 digest,
    uint8 hashFunction,
    uint8 size
  );

  event EntryDeleted (
    address indexed key
  );

  function setEntry(bytes32 _digest, uint8 _hashFunction, uint8 _size)
  public
  {
    Multihash memory entry = Multihash(_digest, _hashFunction, _size);
    entries[msg.sender] = entry;
    emit EntrySet(msg.sender, _digest, _hashFunction, _size);
  }

  function clearEntry()
  public
  {
    require(entries[msg.sender].digest != 0);
    delete entries[msg.sender];
    emit EntryDeleted(msg.sender);
  }

  function getEntry(address _address)
  public
  view
  returns(bytes32 digest, uint8 hashfunction, uint8 size)
  {
    Multihash storage entry = entries[_address];
    return (entry.digest, entry.hashFunction, entry.size);
  }
}

