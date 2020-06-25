// const { GAS_PRICE } = require("../../env/nodeEnv")
const { web3, ethTx } = require('../web3')

const GAS_PRICE = 0;

function buildTransaction(txnCount, addressTo, valueInEther, customData) {
    const data = web3.utils.toHex(customData)

    // Create the transaction object
    //console.log("outgoing data:",web3.utils.toHex(customData)) 
    return {
        nonce: web3.utils.toHex(txnCount),
        gasPrice: web3.utils.toHex(GAS_PRICE),
        gasLimit: web3.utils.toHex(10000000),
        to: addressTo,
        value: web3.utils.toHex(web3.utils.toWei(valueInEther, 'ether')),
        data
    };
}

function buildSmartContractTransaction(txnCount, contractData) {
    const data = web3.utils.toHex(contractData)

    // Create the transaction object
    //console.log("outgoing data:",web3.utils.toHex(customData)) 
    return {
        nonce: web3.utils.toHex(txnCount),
        gasPrice: web3.utils.toHex(GAS_PRICE),
        gasLimit: web3.utils.toHex(10000000),
        data
    }
}

const sendTransaction = async (txObject, privKey) => {
    const tx = new ethTx(txObject)
    tx.sign(privKey)

    const serializedTx = tx.serialize()
    const rawTxHex = '0x' + serializedTx.toString('hex')

    const receipt = await web3.eth.sendSignedTransaction(rawTxHex)
    return receipt
}

const getData = async (blockNumber) => {
    const block = await web3.eth.getBlock(blockNumber)
    //console.log(block)
    await getTransaction(block.transactions[0])
}

const getTransaction = async txHash => {
    console.log("Retrieving transaction from Pantheon...")
    const receivedTX = await web3.eth.getTransaction(txHash)
    return receivedTX
}

const deploySmartContract = async (contractData, addressFrom, privKey) => {
    try {
        const txCount = await web3.eth.getTransactionCount(addressFrom)
        const txObject = buildSmartContractTransaction(txCount, contractData)
        const receipt = await sendTransaction(txObject, privKey)
        //Retriveing contract address and transaction hash
        //console.log("Transaction hash: ", receipt.transactionHash)
        console.log("Contract address", receipt.contractAddress)
        //await create(`block-${receipt.blockNumber}-received-smart-contract-tx`, JSON.stringify(receipt))
        //console.log(`Contract address saved in path: \
        // ./.data/block-${receipt.blockNumber}-received-smart-contract-tx.txt`)
        return receipt.contractAddress
    } catch (e) {
        console.log(e)
        process.exit()
    }
}

const getValueFromPublicBlockchain = async (EventEmitterAbi, address) => {//address: contract address
    //console.log("retrieving data from pantheon public smart contract...")
    const contractInstance = new web3.eth.Contract(EventEmitterAbi, address, {
        from: '0x1234567890123456789012345678901234567891', // default from address
        gasPrice: '0' // default gas price in wei, 20 gwei in this case
    })
    const value = await contractInstance.methods.getValue().call()
    console.log('value', value)
    return value
}

const getValueFromCaller = async (contractAbi, address, calleeContractAddress) => {//address: contract address
    const contractInstance = new web3.eth.Contract(contractAbi, address)
    const value = await contractInstance.methods.getAction(calleeContractAddress).call()
        .catch(console.log)
    console.log('value', value)
    return value
}

const setter = async (contractAddress, addressFrom, txData, privKey) => {
    console.log(contractAddress, addressFrom, txData, privKey)
    const txCount = await web3.eth.getTransactionCount(addressFrom)//.then(result => setValue(result)) 
    const txObject = buildTransaction(txCount, contractAddress, "0", txData)
    const receipt = await sendTransaction(txObject, privKey)
    return receipt
}

module.exports = {
    buildTransaction,
    buildSmartContractTransaction,
    sendTransaction,
    getData,
    getTransaction,
    deploySmartContract,
    getValueFromPublicBlockchain,
    getValueFromCaller,
    setter
}