const HttpServer = require('./httpServer');
const Blockchain = require('./blockchain');
const Operator = require('./operator');
const Miner = require('./miner');
const Node = require('./node');
const Block = require('./blockchain/block');

// simpleThreads = require('simple-threads');


module.exports = function smellycoin(host, port, peers, logLevel, name, mining, address) {
    host = process.env.HOST || host || 'localhost';
    port = process.env.PORT || process.env.HTTP_PORT || port || 3001;
    peers = (process.env.PEERS ? process.env.PEERS.split(',') : peers || []);
    peers = peers.map((peer) => { return { url: peer }; });
    logLevel = (process.env.LOG_LEVEL ? process.env.LOG_LEVEL : logLevel || 6);    
    name = process.env.NAME || name || '1';
    address = process.env.ADDRESS || address || 'miner'
    mining = process.env.MINING || mining || "True"

    require('./util/consoleWrapper.js')(name, logLevel);

    console.info(`Starting node ${name}`);

    let blockchain = new Blockchain(name);
    let operator = new Operator(name, blockchain);
    let miner = new Miner(blockchain, logLevel);
    let node = new Node(host, port, peers, blockchain);
    let httpServer = new HttpServer(node, blockchain, operator, miner);
    
    async function runminer() {
        while (true) {
            await miner.mine(address, address || address)
                .then(async (newBlock) => {
                    newBlock = Block.fromJson(newBlock);
                    await blockchain.addBlock(newBlock);
                })
                .catch(async (ex) => {
                    await console.log(ex)
                });
        };
    };
    httpServer.listen(host, port);


    function freeze(time) {
        const stop = new Date().getTime() + time;
        while(new Date().getTime() < stop);       
    };

    if (mining == "False") {
         // httpServer.listen(host, port);
        console.log("Mining is not enabled.");
    };

    if (mining == "True") {
        let ispaaused = true
        freeze(10000)
        ispaaused = false
         // console.log("Mining is enabled.");
        if (ispaaused == false){
            runminer();    
        } 
    };

    
    
};