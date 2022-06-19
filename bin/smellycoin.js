#!/usr/bin/env node
const naivecoin = require('./../lib/smellycoin');

const argv = require('yargs')
    .usage('Usage: $0 [options]')
    .alias('a', 'host')
    .describe('a', 'Host address. (localhost by default)')
    .alias('p', 'port')
    .describe('p', 'HTTP port. (3001 by default)')
    .alias('l', 'log-level')
    .describe('l', 'Log level (7=dir, debug, time and trace; 6=log and info; 4=warn; 3=error, assert; 6 by default).')
    .describe('name', 'Node name/identifier.')
    .array('peers')
    .describe('peers', 'Peers list.')
    .alias('mng', 'mining')
    .describe('mng', 'enable minign "True", or "False"; True by default ')
    .alias('addr', 'address')
    .describe('address', 'address to use as minerconfig default \'miner\' (change to your address to receive rewards)')
    .help('h')
    .alias('h', 'help')
    .argv;

naivecoin(argv.host, argv.port, argv.peers, argv.logLevel, argv.name, argv.mining, argv.address);