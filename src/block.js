const {GENESIS_DATA} = require('./config.js');
class Block {
    constructor({ timestamp, previousHash, hash, data }) {
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.hash = hash;
        this.data = data;
    }

    static genesisBlock(){
        return new this(GENESIS_DATA);
    }
}

console.log(Block.genesisBlock());