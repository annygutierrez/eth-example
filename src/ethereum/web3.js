import Web3 from "web3";
const ethTx = require('ethereumjs-tx');

const RPC_URL = "https://lacchain.eth.kaytrust.id";

let provider = new Web3.providers.HttpProvider(RPC_URL);

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
    console.log("Using the embeded web3 object from the browser")
    provider = window.web3.currentProvider
}

const web3 = new Web3(provider);
export {web3, ethTx};