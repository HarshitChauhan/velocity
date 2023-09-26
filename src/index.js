const express = require('express');
const request = require("request");
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const PubSub = require('./pubsub');
const blockchain = new Blockchain();

const DEFAULT_PORT = 3001;
let PEER_PORT;
if (process.env.GENERATE_PEER_PORT === 'true') PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
const PORT = PEER_PORT || DEFAULT_PORT;

const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;

const app = express();
const pubsub = new PubSub({ blockchain });
setTimeout(() => pubsub.broadcastChain(), 1000);

app.use(bodyParser.json());
// for( let i = 0; i< 10;i++){
//     blockchain.addBlock({data:`blockchain data ${i}`})

// }
app.get('/api/blocks', (req, res) => {
    res.send(blockchain.chain);

});

app.post('/api/blocks', (req, res) => {
    const { data } = req.body;
    blockchain.addBlock({ data });
    pubsub.broadcastChain();
    res.redirect('/api/blocks');
});

// to sync blockchains from different nodes
const syncBlockchains = () => {
    request(
        { url: `${ROOT_NODE_ADDRESS}/api/blocks` },
        (error, reposnse, body) => {
            if (!error && reposnse.statusCode === 200) {
                const rootChain = JSON.parse(body);
                console.log("Replace chain on sync with", rootChain);
                blockchain.replaceChain(rootChain);
            }
        }
    );
};

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    syncBlockchains();
});