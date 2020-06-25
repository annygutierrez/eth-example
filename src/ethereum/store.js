import { web3 } from "./web3";
import { STORAGE_CONTRACT_ADDRESS } from "../env/keys"
import { setter } from "./utils/web3Operations"
const abi = require("./contracts/storage.abi")

export default class {
    constructor() {
        this.storeContract = new web3.eth.Contract(abi.Storage, STORAGE_CONTRACT_ADDRESS)
    }
    setValue = async (addressFrom, privKey) => {
        try {
            const functionName = "store"
            let set = web3.eth.abi.encodeFunctionSignature(`${functionName}(uint256)`)
            const valueToSet = 64
            let value = web3.eth.abi.encodeParameters(["uint256"], [valueToSet])
            const txData = set + value.substr(2)
            if (privKey.startsWith("0x")) {
                privKey = privKey.slice(2);
            }
            privKey = Buffer.from(privKey, 'hex')//this argument must be without 0x
            const receipt = await setter(STORAGE_CONTRACT_ADDRESS, addressFrom, txData, privKey)
            return receipt
        } catch{

        }
    }

    getValue = async () => {
        const value = await this.storeContract.methods.retreive().call()
        return value
    }
}