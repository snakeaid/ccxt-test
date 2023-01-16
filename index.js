'use strict';
const ccxt = require('ccxt');

(async function () {
    let gate = new ccxt.gate();
    await gate.loadMarkets();
    let gateSymbols = gate.symbols;
})();

const fs = require("fs");
let symbols = JSON.parse(fs.readFileSync("gate_symbols.rtf", "utf8"));

for (let i = 0; i < symbols.length; i++) {
    let symbol = symbols[i];
    symbols[i] = symbol.split('/')[0].split('-')[0];
}
console.dir(gateSymbols);