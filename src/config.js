const MINE_RATE = 1000; //in miliseconds 1000ms = 1 sec
const initialDifficulty = 3;
const GENESIS_DATA = {
    timestamp: Date.now(),
    previousHash: '0x000',
    hash: '0x001',
    data: "GenesisBlock",
    nonce: 0,
    difficulty: initialDifficulty
}

module.exports = { GENESIS_DATA, MINE_RATE };