const {GENESIS_DATA} = require('./config.js');
const createHash = require('./crypto.js')

class Block {
    constructor({ timestamp, previousHash, hash, data }) {
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.hash = hash;
        this.data = data;
    }

    // to create genesis block at start of the blockchain
    static createGenesisBlock(){
        return new this(GENESIS_DATA);
    }
    
    // to create new block in the blockchain
    static mineBlock({previousBlock, data}){
        const block = new this({
            timestamp: Date.now(),
            previousHash: previousBlock.hash,
            hash: createHash(previousBlock.hash + data),
            data
        });
        return block;
    }
}
// console.log(Block.genesisBlock());
// console.log(Block.mineBlock({previousBlock: Block.genesisBlock(), data: "second block"}));

module.exports = Block;