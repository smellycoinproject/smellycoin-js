const Miner = require('./miner');
class minerthread {
    
    constructor(miner) {
        this.miner = Miner
    };
     
    runminer(address) {
        const miner = this.miner
        const x = 1;
        while (x == 1) {
            miner.mine(address, address || address)
                .then((newBlock) => {
                    newBlock = Block.fromJson(newBlock);
                    blockchain.addBlock(newBlock);
                    res.status(201).send(newBlock);
                })
                .catch((ex) => {
                    if (ex instanceof BlockAssertionError && ex.message.includes('Invalid index')) next(console.log('A new block were added before we were able to mine one'), null, ex);
                    else next(ex);
                });
        };
    };
};
module.exports = minerthread