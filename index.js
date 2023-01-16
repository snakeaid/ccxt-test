'use strict';
const ccxt = require('ccxt');
const fs = require("fs");

(async function () {
    //отримуємо усі токени на gate.io
    let gate = new ccxt.gate();
    await gate.loadMarkets();
    let gateTokens = Object.keys(gate.currencies);

    //парсимо токени які вже процесяться
    let processedTokens = JSON.parse(fs.readFileSync("processed_tokens.rtf", "utf8"));
    for (let i = 0; i < processedTokens.length; i++) {
        let symbol = processedTokens[i];
        processedTokens[i] = symbol.split('/')[0].split('-')[0];
    }

    //парсимо токени з uniswap
    let uniswapTokens = JSON.parse(fs.readFileSync("uniswapCurrency.txt", "utf8"));
    for (let i = 0; i < uniswapTokens.length; i++) {
        let currency = uniswapTokens[i];
        uniswapTokens[i] = currency["domainTicker"].split('-')[0];
    }

    //шукаємо які токени з gate є на uniswap, але ще не процесяться
    let newTokens = {totalCurrencies: 0};
    for (let i = 0; i < gateTokens.length; i++) {
        let token = gateTokens[i];
        if (uniswapTokens.includes(token) && !processedTokens.includes(token)) newTokens[token] = [];
    }

    //додаємо усі trade-пари з кожним із знайдених токенів
    let gateSymbols = gate.symbols;
    for (const [token, symbols] of Object.entries(newTokens)) {
        for (const symbol of gateSymbols) {
            if (symbol.startsWith(token + "/")) symbols.push(symbol);
        }
    }

    //записуємо результати в файл
    newTokens["totalCurrencies"] = Object.keys(newTokens).length - 1;
    fs.writeFileSync("new_currencies.txt", JSON.stringify(newTokens));
})();