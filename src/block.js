const { GENESIS_DATA, MINE_RATE } = require('./config.js');
const createHash = require('./crypto.js')

class Block {
    constructor({ timestamp, previousHash, hash, data, nonce, difficulty }) {
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }

    // to create genesis block at start of the blockchain
    static createGenesisBlock() {
        return new this(GENESIS_DATA);
    }

    // to create new block in the blockchain
    static mineBlock({ previousBlock, data }) {
        const previousHash = previousBlock.hash;
        let hash, timestamp;
        let nonce = 0;
        let {difficulty} = previousBlock;

        do {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty({ originalBlock: previousBlock, timestamp });
            hash = createHash(timestamp, previousHash, data, nonce, difficulty);
        } while (!hash.startsWith('0'.repeat(difficulty)));
        //00cdef first no. of difficulty characters of hash should be equal to 00 i.e. no. of difficulty

        const block = new this({
            timestamp,
            previousHash,
            hash,
            data,
            nonce,
            difficulty
        });
        return block;
    }

    // adjust difficulty
    static adjustDifficulty({ originalBlock, timestamp }) {
        const { difficulty } = originalBlock;

        if (difficulty < 1) return 1;
        
        // checking if the mine rate is lower than difference bw timeframe
        if ((timestamp - originalBlock.timestamp) > MINE_RATE) return (difficulty - 1);
        else return (difficulty + 1);


    }
}
// console.log(Block.genesisBlock());
// console.log(Block.mineBlock({previousBlock: Block.genesisBlock(), data: "second block"}));

module.exports = Block;