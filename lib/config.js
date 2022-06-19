// Do not change these configurations after the blockchain is initialized
module.exports = {
    // INFO: The mining reward could decreases over time like bitcoin. See https://en.bitcoin.it/wiki/Mining#Reward.
    MINING_REWARD: 0,
    // INFO: Usually it's a fee over transaction size (not quantity)
    FEE_PER_TRANSACTION: 0.0000001, // at the time of this writing, this would be .021 USD in BTC, so i would say for quite literally instant transactions, this is a pretty good fee.  
    // INFO: Usually the limit is determined by block size (not quantity)
    TRANSACTIONS_PER_BLOCK: 1000,
    genesisBlock: {
        index: 0,
        previousHash: '0',
        timestamp: 1465154705,
        nonce: 0,
        transactions: [
            {
                id: '63ec3ac02f822450039df13ddf7c3c0f19bab4acd4dc928c62fcd78d5ebc6dba',
                hash: null,
                type: 'regular',
                data: {
                    inputs: [],
                    outputs: []
                }
            }
        ]
    },
    pow: {
        getDifficulty: function getDifficulty(blocks, index) {
            // Proof-of-work difficulty settings
            const BASE_DIFFICULTY = Number.MAX_SAFE_INTEGER;
            const EVERY_X_BLOCKS = 150000;
            const POW_CURVE = 15;
            const EVERY_X_SECONDS = 120;
            const AVERAGE_X_BLOCKS = 5;
            index = (index || blocks.length);
            // INFO: The difficulty is the formula that smellycoin uses to check the proof of work, this number is later converted to base 16 to represent the minimal initial hash expected value.
            // taken from https://github.com/Concord-Ecosystem/Concord-Core/blob/master/lib/config.js as i like the way it worked so credits to them as i didnt write this.... 
            if (index > 2 * AVERAGE_X_BLOCKS) {
                let offset = (index - 1) % AVERAGE_X_BLOCKS;
                let avg_stop_index = (index-1) - offset;
                let avg_start_index = avg_stop_index - (AVERAGE_X_BLOCKS-1); // Use AVERAGE_X_BLOCKS-1 because avg_stop_index is one of those AVERAGE_X_BLOCKS
                let time_avg = (blocks[avg_stop_index].timestamp - blocks[avg_start_index].timestamp) / AVERAGE_X_BLOCKS;

                let scale_factor = time_avg / EVERY_X_SECONDS;

                let old_diff = Math.max(
                    Math.floor(
                        BASE_DIFFICULTY / Math.pow(
                        Math.floor((2*AVERAGE_X_BLOCKS + 1) / EVERY_X_BLOCKS) + 1
                        , POW_CURVE)
                    )
                    , 0);
                for(let i = 2 * AVERAGE_X_BLOCKS + 1; i < avg_stop_index; i+=AVERAGE_X_BLOCKS){
                    let i_scale_factor = ((blocks[i-1].timestamp - blocks[i-1 - (AVERAGE_X_BLOCKS - 1)].timestamp) / AVERAGE_X_BLOCKS) / EVERY_X_SECONDS;
                    old_diff = Math.min(Math.max(Math.floor(old_diff * (i_scale_factor)), 0), BASE_DIFFICULTY);
                }

                return Math.min(Math.max(Math.floor(old_diff * (scale_factor)), 0), BASE_DIFFICULTY);
            }
            return Math.max(
                Math.floor(
                    BASE_DIFFICULTY / Math.pow(
                    Math.floor((index + 1) / EVERY_X_BLOCKS) + 1
                    , POW_CURVE)
                )
                , 0);
        
        }
    }
};
