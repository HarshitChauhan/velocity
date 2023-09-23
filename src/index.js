const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const PubSub = require('./pubsub');
const blockchain = new Blockchain();

const PORT = 3001;
const app = express();
const pubsub = new PubSub({blockchain});
setTimeout(()=> pubsub.broadcastChain(),1000);

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
    res.redirect('/api/blocks');
    // res.send(blockchain.chain);
})

app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
);