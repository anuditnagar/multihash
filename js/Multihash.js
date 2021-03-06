function bufferToHex(buffer) {
    var s = ''
      , h = '0123456789ABCDEF';
    (new Uint8Array(buffer)).forEach((v)=>{
        s += h[v >> 4] + h[v & 15];
    }
    );
    return s;
}

function hexToBuffer(hexString) {
    var result = [];
    while (hexString.length >= 2) {
        result.push(parseInt(hexString.substring(0, 2), 16));
        hexString = hexString.substring(2, hexString.length);
    }
    return result;
}

function getBytes32FromMultihash(multihash) {
    const decoded = Base58.decode(multihash);
    return {
        digest: '0x' + bufferToHex(decoded.slice(2)).toLowerCase(),
        hashFunction: decoded[0],
        size: decoded[1],
    };
}

function getMultihashFromBytes32(obj) {
    digest = obj['digest'];
    hashFunction = obj['hashFunction'];
    size = obj['size'];

    if (size === 0)
        return null;

    const hashBytes = hexToBuffer(digest.slice(2));
    var multihashBytes = [];
    multihashBytes[0] = hashFunction;
    multihashBytes[1] = size;
    multihashBytes = multihashBytes.concat(hashBytes);

    h = Base58.encode(multihashBytes)
    console.log(h);
    return h;
}
