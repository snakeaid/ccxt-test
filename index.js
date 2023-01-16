'use strict';
const ccxt = require('ccxt');

(async function() {
    let gate = new ccxt.gate();
    await gate.loadMarkets();
    let symbols = gate.symbols;
    console.dir(symbols, {'maxArrayLength': null});
}) ();