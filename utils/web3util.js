
'use strict'
var Web3 = require('web3');
// var masterNodeABI = require("../contractTpl/abi.json")
var rpc = "http://47.75.0.22:9525"
var abi = require('../contractTpl/masterABI.json')

var web3 = new Web3(rpc)
var {Power} = require('./power');
web3.extend(Power);

var masterNodeAdd = "0x1111111111111111111111111111111111111111"

function master(){
    try {
        return new web3.eth.Contract(abi,masterNodeAdd)
    } catch (error) {
        return null;
    }
}

exports.web3Methods = async function(method,data){
    try {
       switch (method) {
        case "getBalance":
            return await web3.eth.getBalance(data.address);
        case "getBlock":
            return await web3.eth.getBlock(data.number,true);
        case "getBlockByHash":
            return await web3.eth.getBlock(data.number,false);
        case "getTransaction":
            return await web3.eth.getTransaction(data.txhash);
        case "getTransactionReceipt":
            return await web3.eth.getTransactionReceipt(data.txhash);
        case "makeContract":
            return await new web3.eth.Contract(data.ABI,data.address);
        case "getCode":
            return await web3.eth.getCode(data.address)
        case "decodeParameters":
            return await web3.eth.abi.decodeParameters(data.param1,data.param2)
        default:
            return  await web3.eth.getBlockNumber();
       }
    } catch (error) {
        // console.log("err:",error)
        return null;
    }
}
exports.rpc = rpc
exports.web3 = web3;
exports.master = master;